import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { getRequestForVTPASS } from '../../utils/vtpass'
import PaystackButton from '../../components/paystack/PaystackButton'
import { useAuth } from '../../context/AuthContext'
import PayConnectApiSetup from '../../utils/payconnect'
import axios from 'axios'
import { useModal } from '../../context/ModalContext'

const AirtimeTopup = () => {
  const {userInfo} = useAuth()
  const {setAppLoading} = useModal()
  const [selectedProvider, setSelectedProvider] = useState('')
  const api = PayConnectApiSetup()

  useEffect(()=>{
    async function fetchData(){
      // setAppLoading(true)
      const res = await axios.get('https://mypayconnect.com/api/user', {headers: {
        'Authorization': `Token a3f7263350555badacf5ffca21b889f8010bedb8`,
        'Content-Type': 'application/json'
      }})
      // setAppLoading(false)
      // const res = await api.get('network')
      console.log({res})
    }
    fetchData()
  },[])
  
  return (
    <Container>
        <h1>Purchase Airtime</h1>
        <div className='shadow-lg w-2/3 mx-auto mt-5 py-4 px-3 flex flex-col gap-4 outline-none'>
          <select onChange={(e)=> setSelectedProvider(e.target.value)} name="" id="" className='py-3 px-2 w-full border border-gray-300 rounded-lg'>
            <option value="">Select a service provider</option>
            <option value="mtn">MTN</option>
            <option value="glo">GLO</option>
            <option value="airtel">AIRTEL</option>
            <option value="9-mobile">9 MOBILE</option>
          </select>
          <div className='py-2 flex justify-between items-center'>
            {selectedProvider && <p className='font-bold text-lg'>You selected: (#400) {selectedProvider}</p>}
            {selectedProvider && <img className='w-[50px] h-[50px] rounded-full border object-contain' src={`/images/${selectedProvider}-logo.png`} alt={`${selectedProvider}-logo`} />}
          </div>
          <div className='py-3 px-4'>
            <select name="" id="" className='w-full py-3 px-2 border outline-none'>
              <option value="">Select a plan</option>
            </select>
            <input type="text" placeholder='09018283828' className='border w-full mt-4 py-2 px-2 outline-none' />
          </div>
          <div>
            <PaystackButton data={{email: userInfo?.email, amount: 2000}} />
          </div>
        </div>
    </Container>
  )
}

export default AirtimeTopup