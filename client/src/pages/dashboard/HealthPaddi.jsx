import React from 'react'
import Container from '../../components/Container'
import { Link } from 'react-router-dom'

const HealthPaddi = () => {
  return (
    <Container>
        <div className='flex flex-col items-center gap-2 md:p-4 mb-20'>
          <img src="/images/health-padi.jpg" alt="health-padi" className='h-[120px] md:h-[450px] w-full' />
          <div className='w-[80%] mt-2'>
          <p className='md:text-3xl'>Talk to our clinician for free and get the direction you need for your health challenges</p>
          <Link to='/dashboard/health-details'>
          <button className='bg-blue-900 md:text-lg text-white text-[10px] py-1 px-4 md:h-[100px] md:w-[100px] h-[60px] w-[60px] mt-3 absolute bottom-5 rounded-full right-5'>Meet our Doctor</button>
          </Link>
          </div>
        </div>
    </Container>
  )
}

export default HealthPaddi