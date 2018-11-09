export default decimalTime => {
  let negative = false;
  if (decimalTime < 0) {
    negative = true;
    decimalTime *= -1;
  }

  let hours = parseInt(Number(decimalTime));
  let minutes = Math.floor((Number(decimalTime) - hours) * 60);

  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (negative) hours = '-' + hours;
  return hours + ':' + minutes;
};
