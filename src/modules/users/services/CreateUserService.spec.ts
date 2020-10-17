import FakeHashProvider from '../providers/HashUser/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      hashPassword,
    );
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 965689,
      cpf: 963454212,
      address: '10 Downing Street',
    });
    expect(user).toEqual(expect.objectContaining(user));
  });

  it('should not be able to create a new user with the same email of an another user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      hashPassword,
    );
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 965689,
      cpf: 963454212,
      address: '10 Downing Street',
    });

    expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123456',
        phone: 965689,
        cpf: 963454212,
        address: '10 Downing Street',
      }),
    ).rejects.toThrowError('Email already used!');
  });
});
