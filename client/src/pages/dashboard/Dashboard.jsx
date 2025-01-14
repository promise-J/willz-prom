import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Dashboard = () => {
  const {userInfo} = useAuth()
  return (
    <div>Welcome {userInfo?.first_name} {userInfo?.last_name} to the dashboard</div>
  )
}

export default Dashboard