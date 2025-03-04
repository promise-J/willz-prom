import React, { useEffect, useState } from "react";
import Container from "../../../components/Container";
import DashboardTable from "../../../components/utils/DashboardTable";
import ApiSetup, { formatDate } from "../../../utils/ApiSetup";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LuDelete } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";

const initialCategory = {
    name: '',
    categories: [],
    _id: ''
}

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [editCategory, setEditCategory] = useState(initialCategory)


  const api = ApiSetup();

  const fetchCategories = async () => {
    try {
      const res = await api.get("categories/category");
      setCategories(res?.data?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleAddCategory(e) {
    e.preventDefault()
    try {
        const data = {
            name: categoryName,
            categories: subCategories
        }
    
        const res = editCategory?._id ? await api.put(`categories/category/${editCategory?._id}`, data) : await api.post('categories/category', data)
        if(!res?.data?.success){
            const error = res?.data?.data?.error || 'Something went wrong. Please try again later.'
            return toast.error(error)
        }
        if(res?.data?.success){
            const message = res?.data?.data?.message
            if(res?.data?.data?.new){
                setCategories(res?.data?.data?.new)
            }
            toast.success(message)
        }
        setEditCategory(initialCategory)
        setCategoryName('')
        setSubCategories([])
        setSubCategory('')
    } catch (error) {
        console.log(error)
    }
  }

  async function handleDeleteCategory(id) {
    try {
        const canDelete = confirm('Are you sure you want to delete this category?')
        if(canDelete){
            const res = await api.delete(`categories/category/${id}`)
            console.log({res: res?.data})
            if(!res?.data?.success){
                const error = res?.data?.data?.error || 'Something went wrong. Please try again later.'
                return toast.error(error)
            }
            if(res?.data?.success){
                const message = res?.data?.data?.message
                toast.success(message)
                const cats = categories.filter(cat=> cat._id != id)
                console.log(cats)
                setCategories(cats)
            }
            setEditCategory(initialCategory)
            setCategoryName('')
            setSubCategories([])
            setSubCategory('')
        }
    } catch (error) {
        console.log(error)
    }
  }

  function handleKeyDownSubCategory(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (subCategory.trim()) {
        if (subCategories.includes(subCategory.trim())) {
          setSubCategory("");
          return toast.error("Already added");
        }
        setSubCategories((sub) => [...sub, subCategory.trim()]);
        setSubCategory("");
      }
    }
  }

  function removeSubCategory(subCat) {
    const categories = subCategories.filter((cat) => cat != subCat);
    setSubCategories(categories);
  }

  function handleAddNewSubCategory(e) {
    const { value } = e.target;
    setSubCategory(value);
  }

  function handleLoadEditCategory(category){
    setEditCategory({name: category.name, categories: category.categories, _id: category._id})
  }

  useEffect(()=>{
    setCategoryName(editCategory.name)
    setSubCategories(editCategory.categories)
  },[editCategory])

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container>
      <h1>Manage Categories</h1>
      <div className="">
        <div className="md:w-1/2 mx-auto flex flex-col py-1 mb-10">
          <input
            type="text"
            value={categoryName}
            placeholder="Name of category"
            onChange={(e) => setCategoryName(e.target.value)}
            className="border w-full mt-4 py-1 px-2 outline-none rounded-lg"
          />
          <input
            type="text"
            value={subCategory}
            placeholder="Name of sub category"
            onKeyDown={handleKeyDownSubCategory}
            onChange={handleAddNewSubCategory}
            className="border w-full mt-4 py-1 px-2 outline-none rounded-lg"
          />
          {subCategories.length > 0 && (
            <div className="border-x-gray-50 border-2 mt-3 py-2 px-2 flex flex-wrap overflow-x-auto wd-[280px] mdg:w-[530px] gap-3">
              {subCategories.map((cat) => (
                <span
                  key={cat}
                  onClick={() => removeSubCategory(cat)}
                  className="bg-gray-200 rounded-lg py-1 px-3 flex items-center justify-between gap-2 cursor-pointer w-[30%] text-[12px] md:text-[15px]"
                >
                  {cat} <MdCancel />
                </span>
              ))}
            </div>
          )}
          <button onClick={handleAddCategory} className="bg-blue-900 text-white py-1 rounded-md mt-4">
            Create Category
          </button>
        </div>
        <DashboardTable>
          <thead>
            <tr className="bg-blue-50 text-left">
              <th className="px-4 py-2 border">S/N</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Categories</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((row, index) => (
                <tr key={index} className="hover:bg-blue-50">
                  <td className="px-4 py-2 border">{index}</td>
                  <td className="px-4 py-2 border">{formatDate(row.createdAt)}</td>
                  <td className="px-4 py-2 border">{row.name}</td>
                  <td className="px-4 py-2 border">{row.categories[0]}...({row.categories.length})</td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-3">
                      <FaEdit cursor={'pointer'} color="blue" onClick={()=> handleLoadEditCategory(row)} />
                      <FaTrash cursor={'pointer'} onClick={()=> handleDeleteCategory(row._id)} color="blue" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </DashboardTable>
      </div>
    </Container>
  );
};

export default Categories;
