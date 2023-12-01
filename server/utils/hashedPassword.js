import bcrypt from "bcrypt";
export const hashedPasswordHandler = async (password) => {
  const saltRound = 10; // the defult value is 10
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
export const comparePasswordHandler = async (inputPassword, hashedPassword) => {
  const isEqual = await bcrypt.compare(inputPassword, hashedPassword);
  return isEqual;
};
