export default interface IAddressDTO {
  id?: string;
  user_id?: string;
  address_id?: string;
  cep: string;
  address: string;
  address_complement: string;
  neighborhood: string;
  city: string;
  state: string;
}
