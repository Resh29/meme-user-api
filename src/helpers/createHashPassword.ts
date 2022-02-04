import * as bcrypt from 'bcrypt';

type BcryptOptions = {
  salt: number;
  data: string;
};

export const generateHashString = async (
  options: BcryptOptions,
): Promise<string> => {
  return await bcrypt.hash(options.data, options.salt);
};

export const compareHashPassword = (
  password: string | Buffer,
  hashPassword: string,
): boolean => {
  return bcrypt.compareSync(password, hashPassword);
};
