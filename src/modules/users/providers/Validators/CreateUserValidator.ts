import validator from 'email-validator';

interface IData {
  email: string;
}

export default class CreateUserValidator {
  public async emailValidator({ email }: IData): Promise<boolean> {
    const checkEmailFormat = validator.validate(email);

    return checkEmailFormat;
  }
}
