export const formatRupiahCurrency = (value) => {
  return Number(value).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
};
