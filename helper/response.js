exports.Response = (status, message, body) => {
  const toReturn = {
    status,
    message,
    payload: body,
  };
  return toReturn;
};
