export default interface IProfileDTO {
  id?: string;
  phone: number;
  cpf: number;

  addresses?: [
    {
      cep: string;
      address: string;
      address_2: string;
      neighborhood: string;
      city: string;
      state: string;
    },
  ];
  cep: string;
  address: string;
  address_2: string;
  neighborhood: string;
  city: string;
  state: string;
}
