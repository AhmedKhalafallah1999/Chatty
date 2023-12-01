import { body, validationResult } from "express-validator";
import {
  BadRequestError,
  NotAuthinticationError,
} from "../errors/customError.js";
import user from "../models/user.js";
export const validationHandler = (inputs) => {
  return [
    inputs,
    (req, res, next) => {
      const { password, confirmPassword } = req.body;
      const { errors } = validationResult(req);
      let isEqual = true;
      if (confirmPassword) {
        isEqual = password === confirmPassword;
      }
      if (errors.length > 0 || (!isEqual && confirmPassword)) {
        const errMessages = errors.map((err) => err.msg);
        if (!isEqual && confirmPassword) {
          errMessages.push("sorry, not identical passwords");
        }
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
    .withMessage("Please, provide a valid email ")
    .custom(async (value) => {
      const User = await user.findOne({ email: value });
      if (User) {
        throw new BadRequestError("Sorry, this email belongs to another user");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Please, enter a password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Please, provide a password between 8 to 16 characterss"),
  body("confirmPassword")
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
    .withMessage("Please, provide a valid email ")
    .custom(async (value) => {
      const User = await user.findOne({ email: value });
      if (!User) {
        throw new NotAuthinticationError(
          "Sorry, create an account first or enter a valid inputs"
        );
      }
    }),
  body("password").notEmpty().withMessage("Please, enter a password"),
]);
