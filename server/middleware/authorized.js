export const authorizedUser = (req, res, next) => {
  // retrieve the token
  // const token =
  console.log(req.headers.authorization);
  next();
};
