import React, { useState } from 'react'
import Container from '../../components/Container'
import { useAuth } from '../../context/AuthContext';
import { useVtu } from '../../context/VtuContext';
import { useModal } from '../../context/ModalContext';
import PaystackButton from "../../components/paystack/PaystackButton";
import ApiSetup from '../../utils/ApiSetup';
import { electricityValues } from '../../utils/vtu-data';

const ElectricityBill = () => {
  
  const { userInfo } = useAuth();
  const { vtuBalance, purchaseElectricity, verifyCustomer } = useVtu();
  const {setAppLoading} = useModal()
  const [paidType, setPaidType] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [amount, setAmount] = useState("");
  const [meterNo, setMeterNo] = useState("");
  const [phone, setPhone] = useState("");
  const [verified, setVerified] = useState(false)
  const api = ApiSetup();

  const handleSubmit = async (metadata) => {
    try {
      const res = await purchaseElectricity({phone, meter_number, service_id: serviceId, amount, metadata});
    } catch (error) {
      console.log("error from transaction", error);
    }
  };

  async function handleConfirmCustomer(){
    try {
      const data = {service_id: serviceId, customer_id: meterNo, variation_id: 'prepaid'}
      setAppLoading(true)
      const res = await verifyCustomer(data)
      setAppLoading(false)
      if(res?.status == 200){
        setVerified(true)
      }
    } catch (error) {
      setAppLoading(false)
      console.log(error)
    }
  }

  function handlePaidType(e){
    const value = e.target.value
    setPaidType(value)
  }

  function handleSetServiceId(e){
    const value = e.target.value
    setServiceId(value)
  }


  return (
    <Container>
        <h1>Electricity Bills</h1>
        <div className="shadow-lg w-full md:w-2/3 mx-auto mt-5 py-2 md:px-3 flex flex-col gap-4 outline-none">
      {amount > vtuBalance && <marquee className='text-blue-900' behavior="" direction="">Processing amount #{amount}. We are unable to attend to this amount at the moment.</marquee>}
        <p>balance: {vtuBalance}</p>
        <div className="py-4 px-1 md:px-4">
        <select
          onChange={handlePaidType}
          name=""
          id=""
          className="py-3 px-2 w-full border border-gray-300 rounded-lg mt-3"
        >
          <option value="">Select a Paid Type</option>
          <option value="prepaid">Prepaid</option>
          <option value="postpaid">Postpaid</option>
        </select>
        <select
          onChange={handleSetServiceId}
          name=""
          value={serviceId}
          id=""
          className="py-3 px-2 w-full border border-gray-300 rounded-lg mt-3"
        >
          <option value="">Select a service</option>
          {
            electricityValues.map(cv=>(
              <option key={cv.id} value={cv.variation_id}>{cv.value}</option>
            ))
          }
        </select>
        <input
          onChange={(e)=> setAmount(e.target.value)}
          value={amount}
          type="number"
          placeholder="Enter amount"
          className="border w-full mt-4 py-2 px-2 outline-none"
        />
        <input
          onChange={(e)=> setPhone(e.target.value)}
          value={phone}
          type="number"
          placeholder="09139484873"
          className="border w-full mt-4 py-2 px-2 outline-none"
        />
          <input
            onChange={(e) => {
              const value = e.target.value
              setMeterNo(value)
            }}
            type="text"
            placeholder="Enter your meter number"
            className="border w-full mt-3 py-2 px-2 outline-none"
          />
        </div>
        <div>
          { serviceId && phone.length == 11 && meterNo && !verified && (
            <button onClick={handleConfirmCustomer} className='bg-blue-300 text-blue-900 px-4 py-1 rounded-lg border-2'>Confirm</button>
          )}
            {verified && vtuBalance > amount && <PaystackButton
              handleSubmit={handleSubmit}
              data={{
                email: userInfo?.email,
                amount: amount * 100,
                metadata: { phone, amount, email: userInfo?.email },
              }}
            />
            }
        </div>
      </div>
    </Container>
  )
}

export default ElectricityBill