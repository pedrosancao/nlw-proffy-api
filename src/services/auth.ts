import jwt from 'jsonwebtoken';

export interface Token {
  idUser: Number;
}

export const authConfig = {
  secret: process.env.SWT_SECRET || 'proffy',
  expires: process.env.SWT_EXPIRES || 86400,
  saltLength: process.env.SWT_SALT_LEN || 10,
};

export function generateToken (idUser: Number) {
  return jwt.sign({ idUser }, authConfig.secret, { expiresIn: authConfig.expires });
};

export function verifyToken (token: string): Token {
  return jwt.verify(token, authConfig.secret) as Token;
};
