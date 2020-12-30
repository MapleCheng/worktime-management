export const OnlyEnglishNumber = (string) => {
  if (String(string) !== "") {
    for (let str of String(string)) {
      if (
        !(
          (str.charCodeAt() >= 48 && str.charCodeAt() <= 57) ||
          (str.charCodeAt() >= 65 && str.charCodeAt() <= 90) ||
          (str.charCodeAt() >= 97 && str.charCodeAt() <= 122)
        )
      ) {
        return false;
      }
    }
  }
  return true;
};
export const EnglishNumber = (string) => {
  if (String(string) !== "") {
    for (let str of String(string)) {
      if (
        !(
          (str.charCodeAt() >= 48 && str.charCodeAt() <= 57) ||
          (str.charCodeAt() >= 65 && str.charCodeAt() <= 90) ||
          (str.charCodeAt() >= 97 && str.charCodeAt() <= 122) ||
          str.charCodeAt() === 45 ||
          str.charCodeAt() === 95
        )
      ) {
        return false;
      }
    }
  }
  return true;
};
export const CheckNumber = (string) => {
  if (String(string) !== "") {
    for (let str of String(string)) {
      if (!(str.charCodeAt() >= 48 && str.charCodeAt() <= 57)) {
        return false;
      }
    }
  }
  return true;
};
