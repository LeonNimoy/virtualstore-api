export default interface IUserEntity {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone?: number;
  cpf?: number;
  addresses_id?: string;
}
