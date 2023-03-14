interface DateStringObj {
  fullDateStr: string;
  shortDateStr: string;
}

export const getDateString = (date: Date | string): DateStringObj => {
  const inputDate = new Date(date);
  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1;
  const day = inputDate.getDate();

  const shortDateStr = `${month}-${day}`;
  let fullDateStr;
  if (month < 10) {
    fullDateStr = `${year}-0${month}-${day}`;
  } else {
    fullDateStr = `${year}-${month}-${day}`;
  }

  return {
    fullDateStr,
    shortDateStr,
  };
};
