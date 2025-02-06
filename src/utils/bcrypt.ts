import bcrypt from "bcryptjs";

export const hashPassword = async (
  password: string,
  saltRounds: number = 10
) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword).catch(() => false);
};
