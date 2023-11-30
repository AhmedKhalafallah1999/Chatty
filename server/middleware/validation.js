import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customError.js";
export const validationHandler = (inputs) => {
  return [
    inputs,
    (req, res, next) => {
      const { errors } = validationResult(req);
      if (errors.length > 0) {
        const errMessages = errors.map((err) => err.msg);
        console.log(errMessages);
        throw new BadRequestError(errMessages);
      } else {
        next();
      }
    },
  ];
};
export const ValidateRegisterInputs = validationHandler([
  body("email")
    .notEmpty()
    .withMessage("Plaese, enter an email...")
    .isEmail()
    .withMessage("Please, provide a valid email "),
  body("password")
    .notEmpty()
    .withMessage("Please, enter a password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Please, provide a password between 8 to 16 characterss"),
]);
export const ValidateLoginInputs = validationHandler([
  body("email")
    .notEmpty()
    .withMessage("Plaese, enter an email...")
    .isEmail()
    .withMessage("Please, provide a valid email "),
  body("password")
    .notEmpty()
    .withMessage("Please, enter a password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Please, provide a password between 8 to 16 characterss"),
]);
