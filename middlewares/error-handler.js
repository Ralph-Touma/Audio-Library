module.exports = (error, req, res, next) => {
  console.error(error); 

  const status = error.status || 500;
  const message = error.message || 'An unexpected error occurred';

  res.status(status).json({ error: message });
};
