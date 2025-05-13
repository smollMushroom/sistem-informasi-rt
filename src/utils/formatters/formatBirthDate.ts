function formatBirthDate(raw: string): string {
  if (!/^\d{6}$/.test(raw)) return ''; // jika tidak sesuai 6 digit
  const day = raw.slice(0, 2);
  const month = raw.slice(2, 4);
  const year = raw.slice(4, 6);
  const fullYear = parseInt(year) > 50 ? `19${year}` : `20${year}`;
  return `${fullYear}-${month}-${day}`; // format YYYY-MM-DD
}

export default formatBirthDate;