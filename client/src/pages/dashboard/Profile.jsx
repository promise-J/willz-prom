import React from "react";
import { useAuth } from "../../context/AuthContext";
import Container from "../../components/Container";

function Profile() {
  const {userInfo} = useAuth()
  const subCategoriesList = userInfo?.userType === 'vendor' ? userInfo?.subcategories.join(",") : ''
  console.log(userInfo)

  return (
    <Container>
       <div className='shadow-lg w-full md:w-2/3 mx-auto mt-5 py-4 md:px-3 flex flex-col gap-2 outline-none'>
          <div className='py-2 px-1 md:px-4'>
            <label htmlFor="">Email</label>
            <input type="text" value={userInfo?.email} disabled onChange={(e)=> {}} className='border w-full mb-4 py-2 px-2 outline-none rounded-lg disabled:bg-gray-100' />
            <label htmlFor="">Phone number</label>
            <input type="text" placeholder='09027183728' onChange={(e)=> {}} className='border w-full mb-4 py-2 px-2 outline-none rounded-lg' />
            <label htmlFor="">Username</label>
            <input disabled type="text" value={userInfo?.username} onChange={(e)=> {}} className='border w-full mb-4 py-2 px-2 outline-none rounded-lg disabled:bg-gray-100' />
            <label htmlFor="">First Name</label>
            <input type="text" value={userInfo?.first_name} placeholder='First Name' onChange={(e)=> {}} className='border w-full mb-4 py-2 px-2 outline-none rounded-lg' />
            <label htmlFor="">Last Name</label>
            <input type="text" value={userInfo?.last_name} placeholder='Last Name' onChange={(e)=> {}} className='border w-full mb-4 py-2 px-2 outline-none rounded-lg' />
            <label htmlFor="">User Type</label>
            <input type="text" placeholder='client' value={userInfo?.userType} disabled onChange={(e)=> {}} className='border w-full mb-4 py-2 px-2 outline-none rounded-lg' />
            <label htmlFor="">Gender</label>
            <input type="text" placeholder='Male' onChange={(e)=> {}} className='border w-full mb-4 py-2 px-2 outline-none rounded-lg' />
            {
              userInfo?.userType == 'vendor' &&
            <><label htmlFor="">Category</label>
            <input type="text" value={userInfo?.category?.name} disabled placeholder='Category' onChange={(e)=> {}} className='border w-full mb-4 py-2 px-2 outline-none rounded-lg' />
            <label htmlFor="">Sub Category</label>
            <input type="text" value={subCategoriesList} disabled placeholder='Sub Category' onChange={(e)=> {}} className='border w-full mb-4 py-2 px-2 outline-none rounded-lg' /></>
            }
          </div>
          <div>
          </div>
        </div>
    </Container>
  );
}

export default Profile;