const handleError = (res, error) => {
  console.error(error);
  const statusCode = error.status || 500;
  res.status(statusCode).json({ error: error.message });
};

module.exports = { handleError };