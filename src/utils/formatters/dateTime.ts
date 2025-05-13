const formatDate = (newDate: string | Date) => {
  const date = new Date(newDate);
  const formattedDate = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return formattedDate;
};

export default formatDate;