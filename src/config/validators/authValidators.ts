import { body, check } from "express-validator";

const emailValidation = body("email")
  .trim()
  .notEmpty()
  .withMessage(`email field is empty`)
  .isString()
  .withMessage(`email field must be string of characters`)
  .isEmail()
  .withMessage(`email is invalid`)
  .normalizeEmail()
  .escape();
const passwordValidation = body("password");

const signupValidator = [
  body("username"),

  emailValidation,

  passwordValidation,

  body("confirmPassword"),
];

const loginValidator = [];

export { signupValidator, loginValidator };
