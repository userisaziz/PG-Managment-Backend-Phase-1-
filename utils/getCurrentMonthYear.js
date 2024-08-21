const getCurrentMonthYear = () => {
  const currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  return { month, year };
};

module.exports = {
  getCurrentMonthYear,
};
