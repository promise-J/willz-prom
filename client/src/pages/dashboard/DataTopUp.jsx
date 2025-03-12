import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import ApiSetup from '../../utils/ApiSetup'
import { useVtu } from '../../context/VtuContext'
import { useAuth } from '../../context/AuthContext'
import { dataValues } from '../../utils/vtu-data'
import PaystackButton from '../../components/paystack/PaystackButton'
import { formatNumberWithCommas } from '../../utils/helpers'
import toast from 'react-hot-toast'

const DataTopUp = () => {
  const api = ApiSetup()

  const {userInfo} = useAuth()
  const {vtuBalance, purchaseData, vtuData} = useVtu()
  const [selectedProvider, setSelectedProvider] = useState('')
  const [amount, setAmount] = useState(0)
  const [phone, setPhone] = useState('')
  const [selectedDataPlans, setSelectedDataPlans] = useState([])
  const [selectedDataPlan, setSelectedDataPlan] = useState('')

  const handleSubmit = async (metadata)=>{
    try {
      const data = {
        phone,
        network: selectedProvider,
        variation_id: selectedDataPlan,
        amount,
        metadata
      }
      const res = await purchaseData(data)
      if(res?.data?.code == 'success'){
        toast.success('Data purchased successfully')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    const data = dataValues.filter(dv=> dv.network == selectedProvider)
    setSelectedDataPlans(data)
  },[selectedProvider])

  // useEffect(()=>{
  //   const dataLog = async ()=>{
  //     const data = await vtuData()
  //     console.log(data,'the vtu data')
  //   }
  //   dataLog()
  // },[])


  function handleSelectDataPlan(e){
    const value = e.target.value
    const chosenData = dataValues.find(dv=> dv.variation_id == value)
    setSelectedDataPlan(value)
    setAmount(chosenData?.amount)
  }


  return (
    <Container>
        <h1>Purchase Data</h1>
        <div className='shadow-lg w-full md:w-2/3 mx-auto mt-5 py-4 md:px-3 flex flex-col gap-2 outline-none'>
            {amount > vtuBalance && <marquee className='text-blue-900' behavior="" direction="">Processing amount #{amount}. We are unable to attend to this amount at the moment.</marquee>}
          <div className='flex justify-between items-center'>
            {selectedProvider && selectedDataPlan && <p className='font-bold text-lg'>- ({formatNumberWithCommas(amount)}) {selectedProvider}</p>}
            {selectedProvider && <img className='w-[40px] h-[40px] rounded-full border object-contain' src={`/images/${selectedProvider}-logo.png`} alt={`${selectedProvider}-logo`} />}
          </div>
          <div className='py-2 px-1 md:px-4'>
          <select onChange={(e)=> setSelectedProvider(e.target.value)} name="" id="" className='py-3 px-2 w-full border mb-3 border-gray-300 rounded-lg'>
            <option value="">Select a service provider</option>
            <option value="mtn">MTN</option>
            <option value="glo">GLO</option>
            <option value="airtel">AIRTEL</option>
            <option value="9-mobile">9 MOBILE</option>
          </select>
            {selectedProvider && <select onChange={handleSelectDataPlan} value={selectedDataPlan} name="" id="" className='w-full py-3 px-2 border outline-none rounded-lg'>
              <option value="">Select a plan</option>
              {
                selectedDataPlans.map(plan=>(
                  <option key={plan?.id} value={plan?.variation_id}>{plan?.value}({plan?.amount})</option>
                ))
              }
            </select>
            }
            {selectedProvider && selectedDataPlan && <input type="text" placeholder='09018283828' onChange={(e)=> setPhone(e.target.value)} className='border w-full mt-4 py-2 px-2 outline-none rounded-lg' />}
          </div>
          <div>
          {phone.length == 11 && selectedProvider && selectedDataPlan && vtuBalance > amount && <PaystackButton handleSubmit={handleSubmit} data={{email: userInfo?.email, amount: amount * 100, metadata: {phone, amount, email: userInfo?.email}}} />}
          </div>
        </div>
    </Container>
  )
}

export default DataTopUp
