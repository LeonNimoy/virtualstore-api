import { Request, Response, NextFunction } from 'express';

import validator from 'email-validator';

import AppError from '../../../shared/errors/AppError';

export default function ensureDataValidation(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    throw new AppError('Por favor, preencha todos os campos', 401);
  }

  const checkEmailFormat = validator.validate(email);

  if (!checkEmailFormat) {
    throw new AppError('Email inválido');
  }

  const passwordValidation = new RegExp(/^.{6,}$/);

  const checkPasswordFormat = passwordValidation.test(password);

  if (!checkPasswordFormat) {
    throw new AppError('A senha deve ter no mínimo 6 caracteres');
  }

  return next();
}
