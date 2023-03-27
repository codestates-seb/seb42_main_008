interface DateStringObj {
  fullDateStr: string;
  shortDateStr: string;
}

export const getDateString = (date: Date | string): DateStringObj => {
  const inputDate = new Date(date);
  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1;
  const day = inputDate.getDate();

  const shortDateStr = `${month}/${day}`;
  let fullDateStr;
  if (month < 10) {
    fullDateStr = `${year}-0${month}-`;
  } else {
    fullDateStr = `${year}-${month}-`;
  }

  if (day < 10) {
    fullDateStr = fullDateStr + `0${day}`;
  } else {
    fullDateStr = fullDateStr + `${day}`;
  }

  return {
    fullDateStr,
    shortDateStr,
  };
};
