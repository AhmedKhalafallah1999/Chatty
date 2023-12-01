import jwt from "jsonwebtoken";
export const GenerateToken = (user) => {
  const token = jwt.sign({ userId: user._id }, process.env.TOKENSECRETKEY, {
    expiresIn: "1d",
  });
  return token;
};
export const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.TOKENSECRETKEY);
  return decoded;
};
