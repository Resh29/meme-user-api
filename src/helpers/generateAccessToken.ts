import * as jwt from 'jsonwebtoken';

export const generateAccessToken = (
  payload: jwt.JwtPayload,
  secret: jwt.Secret,
): string => {
  return jwt.sign(payload, secret);
};
export const verifyAccessToken = (
  token: string,
  options: jwt.DecodeOptions,
) => {
  return jwt.decode(token, options);
};
