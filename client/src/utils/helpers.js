export function formatNumberWithCommas(value) {
  
  value = value.toString()
  // Remove any non-digit characters except for the decimal point
  value = value.replace(/[^0-9.]/g, '');
  
  // Use a regular expression to insert commas
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return '₦' + value
    // Set the value back to the input field
    // event.target.value = value;
  }

export function formatDate(date, format='DD-MM-YYYY'){
  const formattedDate = moment(date).format(format);
  return formattedDate
}

export function capitalizeFirstLetter(str) {
  if (!str) return str; // Handle empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
}