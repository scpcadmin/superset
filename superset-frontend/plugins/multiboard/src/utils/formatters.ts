export const getDateFromTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${day}.${month}.${year}`;
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const formatDateShort = (timestamp: number): string => {
  const date = new Date(timestamp);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${day}.${month}`;
};

export const getPrevYearDate = (timestamp: number): number => {
  const date = new Date(timestamp);
  const newDate = new Date(date.setFullYear(date.getFullYear() - 1));
  return newDate.getTime();
}

export const getPrevDayDate = (timestamp: number): number => {
  const date = new Date(timestamp);
  const newDate = new Date(date.setDate(date.getDate() - 1));
  return newDate.getTime();
}
