import axios from 'axios';
import { useLocation } from 'react-router-dom';


const ApiSetup = () => {
  const pathname = useLocation()
  console.log({pathname})
  // console.log(pathname.includes('localhost'))
  
  // const baseUrl = "http://localhost:5000/api/"
  const isDev = import.meta.env.VITE_IS_DEV || 'no'
  const baseUrl = isDev == 'yes' ? "http://localhost:5000/api/" : "https://app-sar.onrender.com/api/"
  // const baseUrl = import.meta.env.VITE_BASE_URL
  const token = localStorage.getItem("app-ser-token");
  

  const fetcherApi = axios.create({
    baseURL: baseUrl,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const fetcherFormApi = axios.create({
    baseURL: baseUrl,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }

  });

  return {
    get: (endpoint, params) => fetcherApi.get(endpoint, { params }),
    post: (endpoint, data) => fetcherApi.post(endpoint, data),
    put: (endpoint, data) => fetcherApi.put(endpoint, data),
    putFormData: (endpoint, data) => fetcherFormApi.put(endpoint, data),
    postFormData: (endpoint, data) => fetcherFormApi.post(endpoint, data),
    delete: (endpoint) => fetcherApi.delete(endpoint)
  };
};


const CountryApi = () => {
  const baseUrl = "https://www.universal-tutorial.com/api/";
  const token= import.meta.env.VITE_COUNTRY_TOKEN
  

  const fetcherApi = axios.create({
    baseURL: baseUrl,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return {
    get: (endpoint, params) => fetcherApi.get(endpoint, { params }),
}
}

function reindex(key, arr){
  if(arr.length < 1) return
  const obj = {}
  for(let i = 0; i < arr.length; i++){
    obj[arr[i][key]] = arr[i]
  }
  return obj
}

function formatDate(createdAt) {
  const date = new Date(createdAt);
  
  // Hour and minute in 12-hour format with AM/PM
  const time = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Day of the week (abbreviated) and Month (abbreviated) + Day of the month
  const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
  const monthAndDay = date.toLocaleString('en-US', { month: 'short', day: 'numeric' });

  // Combine everything
  return `${time} | ${dayOfWeek}, ${monthAndDay}`;
}


export default ApiSetup;
export  {CountryApi, reindex, formatDate};

