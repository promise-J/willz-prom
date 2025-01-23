import React from 'react'
import Container from '../../components/Container'

const FundWallet = () => {
  return (
    <Container>
      <div className='bg-red-300d  mt-[70px] w-1/2 mx-auto'>
        <h1 className='text-center text-2xl md:text-3xl'>Fund wallet</h1>
        <div className='flex flex-col justify-center gap-3 w-full'>
          <label htmlFor="">Enter Amount</label>
          <div className='flex items-center w-full border-2 border-grey-200 bg-blue-900'>
            <div className='text-white h-full p-2'>
              <span className='text-sm'>NGN(₦)</span>
            </div>
            <input type="text" className='w-full py-2 px-4' placeholder='Enter a valid amount from 200 to 100,000' />
          </div>
        </div>
        <button className='bg-blue-900 text-white font-bold w-full py-3 rounded-lg mt-10'>PROCEED TO PAY</button>
      </div>
    </Container>
  )
}

export default FundWallet