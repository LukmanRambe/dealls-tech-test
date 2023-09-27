const formatPrice = (value: number) => {
  const price = Number(value);

  return price?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export { formatPrice };
