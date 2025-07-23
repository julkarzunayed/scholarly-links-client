import { format } from "date-fns";

export const capitalizeFirstLetter = (str) => {
  if (!str) return ''; 
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export const ISoTimeToDate = (date) => {
  if (!date) return ''; 
  return  format(new Date(date || '1999-07-22T07:25:33.835Z'), 'dd MMMM yyyy H:mm');
};

