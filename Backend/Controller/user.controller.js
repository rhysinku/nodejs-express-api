export const test = (req, res) => {
  res.send({
    message: "Working API",
  });
};

export const updateUser = (req, res, next) => {
  res.send({
    status: "working",
  });
};
