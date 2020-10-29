import { Request, Response, NextFunction } from 'express';

import validator from 'email-validator';

import AppError from '../../../shared/errors/AppError';

export default function ensureDataValidation(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Email or Password  is missing!', 401);
  }

  const checkEmailFormat = validator.validate(email);

  if (!checkEmailFormat) {
    throw new AppError('Email format invalid!');
  }

  const passwordValidation = new RegExp(/^.{6,}$/);

  const checkPasswordFormat = passwordValidation.test(password);

  if (!checkPasswordFormat) {
    throw new AppError('The password must have a minimum of 6 characters!');
  }

  return next();
}
