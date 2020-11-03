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

  public async validateCpf(cpf: number): Promise<boolean> {
    const cpfValidator = new RegExp(/^.{11,11}$/);

    const stringifyCPF = cpf.toString();
    const checkCpfFormat = cpfValidator.test(stringifyCPF);

    return checkCpfFormat;
  }
}
