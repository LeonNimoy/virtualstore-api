import { Response } from 'express';
import mongoose from 'mongoose';
import { CUSTOM_VALIDATION } from '@src/models/User';

export default abstract class BaseController {
  protected sendCreateUpdateErrorResponse(
    resp: Response,
    error: mongoose.Error.ValidationError | Error,
  ): void {
    if (error instanceof mongoose.Error.ValidationError) {
      const clientErrors = this.handleClientErrors(error);
      resp
        .status(clientErrors.code)
        .send({ code: clientErrors.code, error: clientErrors.error });
    } else {
      resp.status(500).send({ code: 500, error: 'Something went wrong!' });
    }
  }

  private handleClientErrors(
    error: mongoose.Error.ValidationError,
  ): { code: number; error: string } {
    const duplicatedKindErrors = Object.values(error.errors).filter(
      err => err.kind === CUSTOM_VALIDATION.DUPLICATED,
    );
    if (duplicatedKindErrors.length) {
      return { code: 409, error: error.message };
    }
    return { code: 422, error: error.message };
  }
}
