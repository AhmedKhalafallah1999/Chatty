import { UnAuthorizedError } from "../errors/customError.js";

export const authorizedUser = (req, res, next) => {
  // retrieve the token
  const { Authorization } = req.cookies;  
  if (Authorization) {
    next();
  } else {
    throw new UnAuthorizedError("Read Only, User Demo");
  }
};
