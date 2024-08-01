const registerUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "user registered",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const loginUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "user logged in",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
