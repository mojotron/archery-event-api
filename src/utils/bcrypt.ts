import bcrypt from "bcryptjs";

const hashPassword = async (password: string, saltRounds?: number) => {
  const salt = await bcrypt.genSalt(saltRounds || 10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePasswords = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword).catch(() => false);
};

export { hashPassword, comparePasswords };
