export const adminTest = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin. You have access.",
    user: req.user,
  });
};