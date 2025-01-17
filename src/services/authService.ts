export type CreateAccountParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userAgent?: string | undefined;
};

export const createAccount = async (data: CreateAccountParams) => {
  // verify existing user
  // create user
  // create verification code
  // send verification email
  // create session
  // sign access and refresh tokens
  // return user and tokens
};
