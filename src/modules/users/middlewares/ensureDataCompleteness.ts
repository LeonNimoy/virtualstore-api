import { Request, Response, NextFunction } from 'express';

import AppError from '../../../shared/errors/AppError';

export default function ensureDataCompleteness(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    throw new AppError('Por favor, preencha todos os campos', 401);
  }

  return next();
}
