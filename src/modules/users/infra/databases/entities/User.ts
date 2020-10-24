export default interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
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

  payment: [
    {
      card_number: number;
      expire_date: Date;
      security_code: number;
      owner_name: string;
    },
  ];
}
