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

const passwordValidation = body("password")
  .trim()
  .notEmpty()
  .withMessage("password must not be empty")
  .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/)
  .withMessage(
    `password must be be minimum of 8 character and including uppercase letter, lowercase letter, number and special character @$!%*?&`
  )
  .escape();

const signupValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`username field is empty`)
    .isString()
    .withMessage(`username field must be string of characters`)
    .isLength({ min: 3, max: 10 })
    .withMessage(`username length must be between`)
    .matches(/^$/)
    .withMessage(`username accepts`)
    .escape(),

  emailValidation,

  passwordValidation,

  check("confirmPassword")
    .trim()
    .custom((confirmPassword, { req }) => {
      const password = req.body.password;
      if (password !== confirmPassword) return false;
      return true;
    })
    .withMessage(`password and confirm password not matching`)
    .escape(),
];

const loginValidator = [];

export { signupValidator, loginValidator };
