export default class AddressDataValidatorProvider {
  public async validateAddressNumber(address_number: number): Promise<boolean> {
    const addressNumberValidator = new RegExp(/^[0-9]{1,10}$/);

    const checkAddressNumberFormat = addressNumberValidator.test(
      String(address_number),
    );

    return checkAddressNumberFormat;
  }

  public async validateCep(cep: string): Promise<boolean> {
    const cepValidator = new RegExp(/^[0-9]{8,8}$/);

    const checkCepFormat = cepValidator.test(cep);

    return checkCepFormat;
  }
}
