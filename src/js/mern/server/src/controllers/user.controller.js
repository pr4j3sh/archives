const getUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "got user",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "user updated",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "user deleted",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser
}
