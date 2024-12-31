import { body } from "express-validator";

const emailValidation = body("email").trim().isEmail().normalizeEmail().trim();
const passwordValidation = body("password");

const signupValidator = [
  body("username"),

  emailValidation,

  passwordValidation,

  body("confirmPassword"),
];

const loginValidator = [];

export { signupValidator, loginValidator };
