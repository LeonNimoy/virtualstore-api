import validator from 'email-validator';

export default class UserDataValidatorProvider {
  public async validateEmail(email: string): Promise<boolean> {
    const checkEmailFormat = validator.validate(email);

    return checkEmailFormat;
  }

  public async validatePassword(password: string): Promise<boolean> {
    const passwordValidator = new RegExp(/^.{6,}$/);

    const checkPasswordFormat = passwordValidator.test(password);

    return checkPasswordFormat;
  }

  public async validateCpf(cpf: string): Promise<boolean> {
    const cpfValidator = new RegExp(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);

    const checkCpfFormat = cpfValidator.test(cpf);

    return checkCpfFormat;
  }

  public async validatePhone(phone: string): Promise<boolean> {
    const phoneValidator = new RegExp(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
    );

    const checkPhoneFormat = phoneValidator.test(phone);

    return checkPhoneFormat;
  }
}
