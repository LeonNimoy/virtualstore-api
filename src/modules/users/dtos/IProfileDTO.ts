export default interface IProfileDTO {
  id?: string;
  user_id?: string;
  cpf: number;
  phone: number;
  cep: string;
  address: string;
  address_2: string;
  addresses_id?: string;
  neighborhood: string;
  city: string;
  state: string;
}
