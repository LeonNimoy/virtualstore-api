export default interface Address {
  id?: string;
  user_id: string;
  cep: string;
  address: string;
  address_number: number;
  address_complement: string;
  neighborhood: string;
  city: string;
  state: string;
}
