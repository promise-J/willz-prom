import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
import { dashboardData } from '../../components/utils/constants'
import Pagination from '../../components/utils/Pagination'
import Container from '../../components/Container'
import DashboardTable from '../../components/utils/DashboardTable'

const Dashboard = () => {
  const {userInfo} = useAuth()
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filter, setFilter] = useState("");

  // Filter data based on the filter text
  const filteredData = dashboardData.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get the data for the current page
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  return (
    <Container>
        <div className='flex items-center justify-between pe-10 py-3 bg-gray-100'>
          <h1 className='ps-[10px] text-black text-md md:text-2xl font-semibold hidden md:block'>Welcome back, {userInfo?.first_name}{" "}{userInfo?.last_name}</h1>
          <h1 className='ps-[10px] text-black text-md md:text-2xl font-semibold md:hidden'>Welcome {userInfo?.first_name}</h1>
        </div>
        <h2 className='ps-[10px] md:ps-[35px] py-3'>Overview</h2>
        <div className='flex md:gap-10 gap-4 px-2 md:px-[35px] py-4 md:flex-row flex-col'>
          <div className='flex-1 bg-gray-100 hover:bg-blue-50 cursor-pointer p-5 flex flex-col gap-4'>
            <h2 className='text-lg'>Wallet</h2>
            <p className='text-[30px]'>#3,000</p>
          </div>
          <div className='flex-1 bg-gray-100 hover:bg-blue-50 cursor-pointer p-5 flex flex-col gap-4'>
            <h2 className='text-lg'>Transaction</h2>
            <p className='text-[30px]'>4</p>
          </div>
        </div>
        <h2 className='ps-[35px] py-3'>Recent Wallet Funding</h2>

        <DashboardTable>
        <thead>
          <tr className="bg-blue-50 text-left">
            <th className="px-4 py-2 border">Reference</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Curr. balance</th>
            <th className="px-4 py-2 border">Method</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, index) => (
              <tr key={index} className="hover:bg-blue-50">
                <td className="px-4 py-2 border">{row.reference}</td>
                <td className="px-4 py-2 border">{row.date}</td>
                <td className="px-4 py-2 border">{row.amount}</td>
                <td className="px-4 py-2 border">{row.current_balance}</td>
                <td className="px-4 py-2 border">{row.method}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">No data found</td>
            </tr>
          )}
        </tbody>
        </DashboardTable>
      <Pagination
      setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        setCurrentPage={setCurrentPage}
        itemPerPage={itemsPerPage}
      />
      </Container>
  )
}

export default Dashboard