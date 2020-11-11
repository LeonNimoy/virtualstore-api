"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UsersRepository = _interopRequireDefault(require("../repositories/UsersRepository"));

var _CreateUserService = _interopRequireDefault(require("../services/User/CreateUserService/CreateUserService"));

var _UpdateUserService = _interopRequireDefault(require("../services/User/UpdateUserService/UpdateUserService"));

var _DeleteUserService = _interopRequireDefault(require("../services/User/DeleteUserService/DeleteUserService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async list(req, res) {
    if (req.params.id) {
      const findUser = new _UsersRepository.default();
      const userFound = await findUser.findById(req.params.id);

      switch (userFound) {
        case undefined:
          throw new _AppError.default('Usuário não foi encontrado', 400);

        default:
      }

      return res.status(200).json(userFound);
    }

    const users = new _UsersRepository.default();
    const usersFound = await users.find();
    return res.status(200).json(usersFound);
  }

  async create(req, res) {
    const {
      name,
      email,
      password
    } = req.body;

    const createUser = _tsyringe.container.resolve(_CreateUserService.default);

    const userId = await createUser.execute({
      name,
      email,
      password
    });
    return res.status(201).json({
      id: userId
    });
  }

  async update(req, res) {
    const {
      id
    } = req.params;
    const {
      name,
      email,
      password,
      phone,
      cpf
    } = req.body;

    const updateUser = _tsyringe.container.resolve(_UpdateUserService.default);

    const user = await updateUser.execute({
      id,
      name,
      email,
      password,
      phone,
      cpf
    });
    return res.status(200).json(user);
  }

  async delete(req, res) {
    const {
      id
    } = req.params;

    const userDeleted = _tsyringe.container.resolve(_DeleteUserService.default);

    await userDeleted.execute({
      id
    });
    return res.status(200).json({
      message: 'Cadastro removido!'
    });
  }

}

exports.default = UsersController;