import React, { useState } from 'react'
import Container from '../../components/Container'
import { useAuth } from '../../context/AuthContext';
import { useVtu } from '../../context/VtuContext';
import ApiSetup from '../../utils/ApiSetup';
import PaystackButton from "../../components/paystack/PaystackButton";
import { useModal } from '../../context/ModalContext';
import { cableValues } from '../../utils/vtu-data';

const TvSubcription = () => {
  const { userInfo } = useAuth();
  const { vtuBalance, purchaseCable, verifyCustomer } = useVtu();
  const { setAppLoading } = useModal();
  const [tv, setTv] = useState("");
  const [tvPlan, setTvPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [phone, setPhone] = useState("");
  const [chosenTvs, setChosenTvs] = useState([])
  const [verified, setVerified] = useState(false)
  const api = ApiSetup();

  const handleSubmit = async (metadata) => {
    try {
      const res = await purchaseCable({phone, service_id: tv, smartcard_number: cardNo, variation_id: tvPlan, amount, metadata});
      if(res?.data?.code == 'success'){
        toast.success('Cable purchased successfully')
      }
    } catch (error) {
      console.log("error from transaction", error);
    }
  };

  async function handleConfirmCustomer(){
    try {
      const data = {service_id: tv, customer_id: cardNo}
      setAppLoading(true)
      const res = await verifyCustomer(data)
      setAppLoading(false)
      if(res?.data?.code == 'success'){
        setVerified(true)
      }
    } catch (error) {
      setAppLoading(false)
      console.log(error)
    }
  }

  function handleChangeTv(e){
    const value = e.target.value
    const tvTypeData = cableValues.filter(cv=> cv.type == value)
    setChosenTvs(tvTypeData)
    setTv(value)
  }

  function handleTvItem(e){
    const value = e.target.value
    setTvPlan(value)
    const chosenPlan = cableValues.find(cv=> cv.variation_Id == value)
    setAmount(chosenPlan.amount)
  }


  return (
    <Container>
        <h1>TV Subscription</h1>
        <div className="shadow-lg w-full md:w-2/3 mx-auto mt-5 py-2 md:px-3 flex flex-col gap-4 outline-none">
      {amount > vtuBalance && <marquee className='text-blue-900' behavior="" direction="">Processing amount #{amount}. We are unable to attend to this amount at the moment.</marquee>}
        <p>balance: {vtuBalance}</p>
        <div className="py-4 px-1 md:px-4">
        <select
          onChange={handleChangeTv}
          name=""
          id=""
          className="py-3 px-2 w-full border border-gray-300 rounded-lg mt-3"
        >
          <option value="">Select a TV</option>
          <option value="dstv">DSTV</option>
          <option value="gotv">GOTV</option>
          <option value="startimes">STARTIMES</option>
        </select>
        <select
          onChange={handleTvItem}
          name=""
          value={tvPlan}
          id=""
          className="py-3 px-2 w-full border border-gray-300 rounded-lg mt-3"
        >
          <option value="">Select a service</option>
          {
            chosenTvs.map(cv=>(
              <option key={cv.id} value={cv.variation_Id}>{cv.value}</option>
            ))
          }
        </select>
        {
        tv && tvPlan && 
        <input
          value={amount}
          disabled
          type="number"
          placeholder="50"
          className="border w-full mt-4 py-2 px-2 outline-none"
        />
        }
          <input
            onChange={(e) => {
              const value = e.target.value
              setCardNo(value)
            }}
            type="text"
            placeholder="Enter your card number"
            className="border w-full mt-3 py-2 px-2 outline-none"
          />
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="string"
            placeholder="phone number"
            className="border w-full mt-3 py-2 px-2 outline-none"
            />
        </div>
        <div>
          { tv && phone.length == 11 && tvPlan && cardNo && !verified && (
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

export default TvSubcription