export function formatNumberWithCommas(value) {
  
    // Remove any non-digit characters except for the decimal point
    value = value.replace(/[^0-9.]/g, '');
  
    // Use a regular expression to insert commas
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    // Set the value back to the input field
    event.target.value = value;
  }