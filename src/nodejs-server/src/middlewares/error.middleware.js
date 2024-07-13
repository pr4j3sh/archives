const errorHandler = (error, req, res, next) => {
  console.log(error);
  res.status(500).json({ message: error.message });
};

module.exports = errorHandler;
