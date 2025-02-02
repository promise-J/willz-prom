import axios from "axios";

const PayConnectApiSetup = () => {
  
    const baseUrl = "https://mypayconnect.com/api/"
    // const baseUrl = import.meta.env.VITE_BASE_URL
    const token = import.meta.env.VITE_PAY_CONNECT;
    
  
    const fetcherApi = axios.create({
      baseURL: baseUrl,
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
  
    return {
      get: (endpoint, params) => fetcherApi.get(endpoint, { params }),
      post: (endpoint, data) => fetcherApi.post(endpoint, data),
      put: (endpoint, data) => fetcherApi.put(endpoint, data),
      delete: (endpoint) => fetcherApi.delete(endpoint)
    };
};


export default PayConnectApiSetup