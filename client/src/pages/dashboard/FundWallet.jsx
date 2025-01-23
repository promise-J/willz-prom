import React from 'react'
import Container from '../../components/Container'

const FundWallet = () => {
  return (
    <Container>
      <div className='bg-red-300 mt-[50px] w-1/2 mx-auto'>
        <h1 className='text-center text-2xl md:text-3xl'>Fund wallet</h1>
        <div className='bg-blue-300 flex flex-col justify-center gap-3 w-full'>
          <label htmlFor="">Enter Amount</label>
          <div className='flex items-center w-full bg-green-400'>
            <div className='bg-yellow-200'>
              <span>NGN (₦)</span>
            </div>
            <input type="text" className='w-full py-2 ' placeholder='Enter a valid amount from 200 to 100,000' />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default FundWallet