export const hourFormat = (time) => {
  time = parseInt(time) || 0;
  let hour = Math.floor(time / 60);
  return hour < 10 && hour >= 0 ? `0${hour}` : `${hour}`;
};
export const minuteFormat = (time) => {
  time = parseInt(time) || 0;
  let minute = time % 60;
  return minute < 10 && minute >= 0 ? `0${minute}` : `${minute}`;
};
