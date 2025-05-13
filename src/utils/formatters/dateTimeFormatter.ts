const dateTimeFormatter = (isoString: string, withTime: boolean = false): string => {
  const date = new Date(isoString);

  return date.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(withTime && {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta',
      hour12: false,
    }),
  });
};

export default dateTimeFormatter