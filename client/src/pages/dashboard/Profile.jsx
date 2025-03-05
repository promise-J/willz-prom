import React from "react";
import { useAuth } from "../../context/AuthContext";
import Container from "../../components/Container";

function Profile() {
  return (
    <Container>
       <div className='shadow-lg w-full md:w-2/3 mx-auto mt-5 py-4 md:px-3 flex flex-col gap-2 outline-none'>
          <div className='py-2 px-1 md:px-4'>
            <label htmlFor="">Email</label>
            <input type="text" placeholder='johndoe@gmail.com' onChange={(e)=> {}} className='border w-full mb-4 py-2 px-2 outline-none rounded-lg' />
            <label htmlFor="">Phone number</label>
            <input type="text" placeholder='johndoe@gmail.com' onChange={(e)=> {}} className='border w-full mb-4 py-2 px-2 outline-none rounded-lg' />
          </div>
          <div>
          </div>
        </div>
    </Container>
  );
}

export default Profile;