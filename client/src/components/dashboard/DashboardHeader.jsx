import React from 'react'

const DashboardHeader = () => {
  return (
    <div className='py-3 flex justify-end pe-10 border-b-[1px] border-gray-300'>
        <img className='h-8 rounded-full border-2 border-gray-300 cursor-pointer' src='/images/profileImage.png' />
    </div>
  )
}

export default DashboardHeader