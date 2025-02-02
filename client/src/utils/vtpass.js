import axios from "axios";

const VTPASS_URL = 'https://vtpass.com/api/'
const VTPASS_SANDBOX_URL = 'https://sandbox.vtpass.com/api/'

const VITE_VTPASS_PK = import.meta.env.VITE_VTPASS_PK
const VITE_VTPASS_SK = import.meta.env.VITE_VTPASS_SK
const VITE_VTPASS_API_KEY = import.meta.env.VITE_VTPASS_API_KEY

function generateRequestID() {
    // Get the current date in Africa/Lagos timezone (GMT+1)
    const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Lagos"}));

    // Get the components of the date and time
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');

    // Concatenate the date and time in the required format (YYYYMMDDHHMM)
    const timestamp = `${year}${month}${day}${hour}${minute}`;

    // Add random alphanumeric string (this is optional, you can customize it as needed)
    const randomString = Math.random().toString(36).substring(2, 10); // 8-character random string

    // Combine the timestamp and random string to form the request_id
    const requestID = `${timestamp}${randomString}`;

    return requestID;
}

async function getRequestForVTPASS(data){
    // if(!data){
    //     return {message: 'Data must be provided'}
    // }
    const header = {
        'api-key': VITE_VTPASS_API_KEY,
        'public-key': VITE_VTPASS_PK
    }
    const url = `${VTPASS_SANDBOX_URL}${'service-variations?serviceID=mtn-data'}`
    const res = await axios.get(url)
    console.log(res,'the data plan')
}

// For GET request you’ll need to pass the api-key and public-key through the request header.
// api-key: xxxxxxxxxxxxxxxxxxxx
// public-key: PK_xxxxxxxxxxxxxxxxx
// For POST request you’ll need to pass the api-key and secret-key through the request header.
// api-key: xxxxxxxxxxxxxxxxxxxx 
// secret-key: SK_xxxxxxxxxxxxxxxxx

export {generateRequestID, getRequestForVTPASS}