const getSemester = (date) => {
  let semester, schoolYear;
  date = date || new Date();

  schoolYear = (new Date().getMonth() + 1 < 8 ? new Date().getFullYear() - 1 : new Date().getFullYear()) - 1911;
  semester = new Date().getMonth() + 1 >= 2 && new Date().getMonth() + 1 < 8 ? "-2" : "-1";

  return `${schoolYear}${semester}`;
};

export default getSemester;
