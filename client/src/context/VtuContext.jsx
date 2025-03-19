import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ApiSetup from "../utils/ApiSetup";
import { useAuth } from "./AuthContext";

const VtuContext = createContext();

export const VtuProvider = ({ children }) => {
  const api = ApiSetup();
  const {userInfo} = useAuth()
  const [vtuBalance, setVtuBalance] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const VTU_PASSWORD = import.meta.env.VITE_VTU_PASSWORD;
  const VTU_USERNAME = import.meta.env.VITE_VTU_USERNAME;

  useEffect(() => {
    getVtuBalance();
  }, []);

  async function createTransaction(data) {
    try {
      const res = await api.post("transactions/create-transaction", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getVtuBalance() {
    try {
      const res = await axios.get(
        `https://vtu.ng/wp-json/api/v1/balance?username=${VTU_USERNAME}&password=${VTU_PASSWORD}`
      );
      setVtuBalance(+res.data.data.balance.split(".")[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function vtuData() {
    try {
      const res = await axios.get(
         `https://vtu.ng/wp-json/api/v1/data?username=${VTU_USERNAME}&password=${VTU_PASSWORD}`
        // `https://vtu.ng/wp-json/api/v1/balance?username=${VTU_USERNAME}&password=${VTU_PASSWORD}`
      );
      return res?.data
    } catch (error) {
      console.log(error);
    }
  }
  const purchaseAirtime = async ({phone, network, amount, metadata}) => {
    const trxData = {
        userId: userInfo?._id,
        type: "airtime",
        amount: amount,
        description: "airtime purchase",
        trxref: metadata?.trxref,
        transaction: metadata?.transaction,
        recipient: phone,
        status: "success",
      };

    try {
      if (!phone) {
        return toast.error("Please enter a valid phone number");
      }
      if (!amount) {
        return toast.error("Please enter a valid amount");
      }
      if (!network) {
        return toast.error("Please enter a valid network");
      }
      const res = await axios.get(
        `https://vtu.ng/wp-json/api/v1/airtime?username=${VTU_USERNAME}&password=${VTU_PASSWORD}&phone=${phone}&network_id=${network}&amount=${amount}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      trxData.status = 'failed'
      createTransaction(trxData)
    }
  };
  
  const purchaseData = async ({phone, network, variation_id, amount, metadata}) => {
    const trxData = {
        userId: userInfo?._id,
        type: "data",
        amount: amount,
        description: "data purchase",
        trxref: metadata?.trxref,
        transaction: metadata?.transaction,
        recipient: phone,
        status: "success",
      };

    try {
      if (!phone) {
        return toast.error("Please enter a valid phone number");
      }
      if (!variation_id) {
        return toast.error("Please enter a valid data plan");
      }
      if (!network) {
        return toast.error("Please enter a valid network");
      }
    //   const res = await axios.get(
    //     `https://vtu.ng/wp-json/api/v1/airtime?username=${VTU_USERNAME}&password=${VTU_PASSWORD}&phone=${"08111158225"}&network_id=${"mtn"}&amount=50`
    //   );
      const res = await axios.get(`https://vtu.ng/wp-json/api/v1/data?username=${VTU_USERNAME}&password=${VTU_PASSWORD}&phone=${phone}&network_id=${network}&variation_id=${variation_id}`)
      if(res.data.code == 'success'){
        createTransaction(trxData)
      }
      return res;
    } catch (error) {
      trxData.status = 'failed'
      createTransaction(trxData)
    }
  };
  const verifyCustomer = async ({service_id, customer_id, variation_id=''}) => {

    try {
      if (!service_id) {
        return toast.error("Please enter a valid service id");
      }
      if (!variation_id) {
        return toast.error("Please enter a valid variation plan");
      }
      if (!customer_id) {
        return toast.error("Please enter a valid customer id");
      }
      const res = await axios.get(`https://vtu.ng/wp-json/api/v1/verify-customer?username=${VTU_USERNAME}&password=${VTU_PASSWORD}&customer_id=${customer_id}&service_id=${service_id}&variation_id=${variation_id}`)
      if(res.data.code == 'success'){
      }
      console.log({res})
      return res;
    } catch (error) {
      console.log({error})
    }
  };
  const purchaseCable = async ({phone, service_id, smartcard_number, variation_id, amount, metadata}) => {
    const trxData = {
        userId: userInfo?._id,
        type: "data",
        amount: amount,
        description: "cable purchase",
        trxref: metadata?.trxref,
        transaction: metadata?.transaction,
        recipient: phone,
        status: "success",
      };

    try {
      if (!phone) {
        return toast.error("Please enter a valid phone number");
      }
      if (!variation_id) {
        return toast.error("Please enter a valid variation plan");
      }
      if (!service_id) {
        return toast.error("Please enter a service id");
      }
      if (!smartcard_number) {
        return toast.error("Please enter a valid smart card number");
      }
      
      const res = await axios.get(`https://vtu.ng/wp-json/api/v1/tv?username=${VTU_USERNAME}&password=${VTU_PASSWORD}&phone=${phone}&service_id=${service_id}&smartcard_number=${smartcard_number}&variation_id=${variation_id}`)
      if(res.data.code == 'success'){
        createTransaction(trxData)
      }
      return res;
    } catch (error) {
      trxData.status = 'failed'
      createTransaction(trxData)
    }
  };
  const purchaseElectricity = async ({phone, meter_number, service_id, amount, metadata}) => {
    const trxData = {
        userId: userInfo?._id,
        type: "data",
        amount: amount,
        description: "electricity purchase",
        trxref: metadata?.trxref,
        transaction: metadata?.transaction,
        recipient: phone,
        status: "success",
      };

    try {
      if (!phone) {
        return toast.error("Please enter a valid phone number");
      }
      if (!meter_number) {
        return toast.error("Please enter a valid meter number");
      }
      if (!service_id) {
        return toast.error("Please enter a valid network");
      }
      
    //   const res = await axios.get(
    //     `https://vtu.ng/wp-json/api/v1/airtime?username=${VTU_USERNAME}&password=${VTU_PASSWORD}&phone=${"08111158225"}&network_id=${"mtn"}&amount=50`
    //   );
      const res = await axios.get(`https://vtu.ng/wp-json/api/v1/tv?username=${VTU_USERNAME}&password=${VTU_PASSWORD}&phone=${phone}&service_id=${service_id}&meter_number=${meter_number}`)
      if(res.data.code == 'success'){
        createTransaction(trxData)
      }
      return res;
    } catch (error) {
      trxData.status = 'failed'
      createTransaction(trxData)
    }
  };

  return (
    <VtuContext.Provider
      value={{
        getVtuBalance,
        purchaseAirtime,
        purchaseData,
        createTransaction,
        verifyCustomer,
        purchaseCable,
        purchaseElectricity,
        vtuBalance,
        vtuData,
        setTransactionData,
        transactionData
      }}
    >
      {children}
    </VtuContext.Provider>
  );
};

export const useVtu = () => useContext(VtuContext);
