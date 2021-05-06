export const hourFormat = (time) => {
  time = parseInt(time) || 0;
  if (time>=0) {
    let hour = Math.floor(time / 60);
    return hour < 10 && hour >= 0 ? `0${hour}` : `${hour}`;
  } else {
    let hour = Math.floor(Math.abs(time) / 60);

    return `- ${hour}`
  }
};
export const minuteFormat = (time) => {
  time = parseInt(time) || 0;
  let minute = time % 60;
  return minute < 10 && minute >= 0 ? `0${minute}` : `${Math.abs(minute)}`;
};
