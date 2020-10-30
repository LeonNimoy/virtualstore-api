import FakeHashProvider from '../../../providers/HashUser/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../../../repositories/fakes/FakeUsersRepository';
import AppError from '../../../../../shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashPassword: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeHashPassword = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashPassword);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });
    expect(user).toEqual(expect.objectContaining(user));
  });

  it('should not be able to create a new user with the same email of an another user', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with an invalid email', async () => {
    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with a password that have less then 6 characters', async () => {
    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
