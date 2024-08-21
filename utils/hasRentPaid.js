const hasTenantPaidRent = (tenant) => {
  const { month, year } = getCurrentMonthYear();
  const rentEntry = tenant.rentHistory.find(
    (entry) =>
      entry.month === month && entry.year === year && entry.amountPaid > 0
  );
  return !!rentEntry;
};
export default {
  hasTenantPaidRent,
};
