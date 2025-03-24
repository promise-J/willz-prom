export function formatNumberWithCommas(value) {
  if(value){
    value = value.toString()
    value = value.replace(/[^0-9.]/g, '');
    
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return '₦' + value
  }
  }

export function formatDate(date, format='DD-MM-YYYY'){
  const formattedDate = moment(date).format(format);
  return formattedDate
}

export function capitalizeFirstLetter(str) {
  if (!str) return str; // Handle empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function soundNotification(){
  const onlineSound = new Audio('/audio/network-status.mp3');
  onlineSound.play();
}