import { body, check } from "express-validator";

const nameValidation = (
  input: string,
  label: string,
  min: number = 3,
  max: number = 30
) => {
  return body(input)
    .trim()
    .notEmpty()
    .withMessage(`${label} field is empty`)
    .isString()
    .withMessage(`${label} field must be string of characters`)
    .isLength({ min, max })
    .withMessage(`${label} length must be between ${min} and ${max} characters`)
    .matches(/^$/)
    .withMessage(`${label} accepts`)
    .escape();
};

const emailValidation = () => {
  return body("email")
    .trim()
    .notEmpty()
    .withMessage(`email field is empty`)
    .isString()
    .withMessage(`email field must be string of characters`)
    .isEmail()
    .withMessage(`email is invalid`)
    .normalizeEmail()
    .escape();
};

const passwordValidation = () => {
  return body("password")
    .trim()
    .notEmpty()
    .withMessage("password must not be empty")
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/)
    .withMessage(
      `password must be be minimum of 8 character and including uppercase letter, lowercase letter, number and special character @$!%*?&`
    )
    .escape();
};

const confirmPasswordValidation = () => {
  return check("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("confirm password filed must be filled")
    .custom((confirmPassword, { req }) => {
      const password = req.body.password;
      if (password !== confirmPassword) return false;
      return true;
    })
    .withMessage(`password and confirm password not matching`)
    .escape();
};

const signupValidator = [
  nameValidation("firstName", "first name"),
  nameValidation("lastName", "last name"),
  emailValidation(),
  passwordValidation(),
  confirmPasswordValidation(),
];

export { signupValidator };
