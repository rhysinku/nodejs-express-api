export const test = (req, res) => {
  res.send({
    message: "Working API",
  });
};

export const updateUser = async (req, res, next) => {
  res.send({
    message: "Update",
    paramid: req.params.id,
  });
};
