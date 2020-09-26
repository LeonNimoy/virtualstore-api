/* eslint-disable @typescript-eslint/ban-types */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(payload: object): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
  }
}
