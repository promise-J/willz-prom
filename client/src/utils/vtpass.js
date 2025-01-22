
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


export {generateRequestID}