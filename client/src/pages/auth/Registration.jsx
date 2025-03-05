import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { useModal } from "../../context/ModalContext";
import ApiSetup from "../../utils/ApiSetup";
import Select from "react-select";

const initialRegisterData = {
  email: "",
  username: "",
  password: "",
  first_name: "",
  last_name: "",
};

const Registration = () => {
  const [searchParams] = new useSearchParams();
  const email = searchParams.get("email");

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const api = ApiSetup();

  const navigate = useNavigate();

  const { setUserType, userType, isLoading } = useAuth();
  const { setAppLoading } = useModal();

  const handleRegiserUser = async () => {
    try {
      const selOptions = selectedOptions.map(op=> op.value)

      const payload = {
        email,
        userType,
        category: selectedCategory,
        subcategories: selOptions
      };

      setAppLoading(true);
      const res = await api.post("users/register-user", payload);
      console.log(res.data, "the register user");
      setAppLoading(false);
      const error = res?.data?.data?.error || "";
      if (error == "User does not exist. Please register!") {
        const error = 'User does not exist. Please register!'
        toast.error(error, {position: "top-right"})
        return navigate("/sign-up");
      }
      if (res?.data?.success) {
        const data_response = res?.data?.data?.message;
        toast.success(data_response, { position: "top-right" });
        navigate("/login");
      } else {
        const error = res?.data?.data?.error
          ? res?.data?.data?.error
          : "something went wrong";
        toast.error(error, { position: "top-right" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await api.get("categories/category");
        setCategories(res?.data?.data?.message);
      } catch (error) {}
    }
    fetchCategories();
  }, []);

  function handleSelectedCategory(e) {
    const { value } = e.target;
    setSelectedCategory(value);
    const selectedCat = categories.find((cat) => cat._id == value);
    const catArr = selectedCat.categories;
    const items = catArr.map((cat) => ({ label: cat, value: cat }));
    setSelectedSubCategories(items);
  }

  const handleSubcategoryChange = (e) => {
    setSelectedOptions(e); // Update selected option state
    console.log("Selected Option:", e);
  };

  const handleChangeSubCategory = (event) => {
    const options = event.target.options;
    const values = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setSelectedSubCategories(values);
  };

  return (
    <div>
      <div className="md:w-1/3 w-full md:px-2 px-4 mx-auto mt-20 p-3 shadow-lg">
        <h1 className="text-center text-2xl">Complete your registration</h1>
        <div className="mt-4 relative rounded-lg text-gray-400">
          <label htmlFor="" className="ml-2">
            Sign up as
          </label>
          <div className="flex p-2 gap-2">
            <div
              onClick={() => setUserType("vendor")}
              className={`flex-1 gap-2 flex justify-center border px-2 py-1 rounded-lg cursor-pointer ${
                userType == "vendor" && "bg-blue-900 text-white"
              }`}
            >
              <label htmlFor="">Vendor</label>
              {/* <input type="radio" name="user-type" onChange={(e)=>{
                setUserType(e.target.value)
              } 
              } value='vendor' id="" /> */}
            </div>
            <div
              onClick={() => setUserType("client")}
              className={`flex-1 gap-2 flex justify-center border px-2 py-1 rounded-lg cursor-pointer ${
                userType == "client" && "bg-blue-900 text-white"
              }`}
            >
              <label htmlFor="">Client</label>
              {/* <input type="radio" name="user-type" onChange={(e)=> {
                setUserType(e.target.value)
              }} value='client' id="" /> */}
            </div>
          </div>
        </div>
        {userType == "vendor" && (
          <>
            <div className="mt-4 relative rounded-lg">
              <select
                onChange={handleSelectedCategory}
                value={selectedCategory}
                className="w-full border py-2 px-3 rounded-lg"
                id=""
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat?._id} value={cat?._id}>
                    {cat?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 relative rounded-lg">
              {selectedCategory && (
                <Select
                  onChange={handleSubcategoryChange}
                  isMulti
                  value={selectedOptions}
                  options={selectedSubCategories}
                  placeholder="Select an sub category"
                />
              )}
            </div>
          </>
        )}
        <div className="mt-4">
          <button
            onClick={handleRegiserUser}
            className="bg-blue-900 text-white px-4 py-3 w-full rounded-lg"
          >
            {isLoading ? "Loading..." : "Complete Registration"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
