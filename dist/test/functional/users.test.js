"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("@src/models/User");
const authService_1 = __importDefault(require("@src/services/authService"));
describe('Users functional tests', () => {
    beforeEach(async () => {
        await User_1.User.deleteMany({});
    });
    describe('When creating a new user', () => {
        it('should successfully create a new user  with encrypted password', async () => {
            const newUser = {
                name: 'John Doe',
                email: 'john@mail.com',
                password: '1234',
            };
            const response = await global.testRequest.post('/users').send(newUser);
            expect(response.status).toBe(201);
            await expect(authService_1.default.comparePasswords(newUser.password, response.body.password)).resolves.toBeTruthy();
            expect(response.body).toEqual(expect.objectContaining({
                ...newUser,
                ...{ password: expect.any(String) },
            }));
        });
        it('Should return 422 when there is a validation error', async () => {
            const newUser = {
                email: 'john@mail.com',
                password: '1234',
            };
            const response = await global.testRequest.post('/users').send(newUser);
            expect(response.status).toBe(422);
            expect(response.body).toEqual({
                code: 422,
                error: 'User validation failed: name: Path `name` is required.',
            });
        });
        it('Should return 409 when the email already exists', async () => {
            const newUser = {
                name: 'John Doe',
                email: 'john@mail.com',
                password: '1234',
            };
            await global.testRequest.post('/users').send(newUser);
            const response = await global.testRequest.post('/users').send(newUser);
            expect(response.status).toBe(409);
            expect(response.body).toEqual({
                code: 409,
                error: 'User validation failed: email: already exists in the database.',
            });
        });
        describe('when authenticating a user', () => {
            it('should generate a token for a valid user', async () => {
                const newUser = {
                    name: 'John Doe',
                    email: 'john@mail.com',
                    password: '1234',
                };
                await new User_1.User(newUser).save();
                const response = await global.testRequest
                    .post('/users/authenticate')
                    .send({ email: newUser.email, password: newUser.password });
                expect(response.body).toEqual(expect.objectContaining({ token: expect.any(String) }));
            });
            it('Should return UNAUTHORIZED if the user with the given email is not found', async () => {
                const response = await global.testRequest
                    .post('/users/authenticate')
                    .send({ email: 'some-email@mail.com', password: '1234' });
                expect(response.status).toBe(401);
            });
            it('Should return ANAUTHORIZED if the user is found but the password does not match', async () => {
                const newUser = {
                    name: 'John Doe',
                    email: 'john@mail.com',
                    password: '1234',
                };
                await new User_1.User(newUser).save();
                const response = await global.testRequest
                    .post('/users/authenticate')
                    .send({ email: newUser.email, password: 'different password' });
                expect(response.status).toBe(401);
            });
        });
    });
});
//# sourceMappingURL=users.test.js.map