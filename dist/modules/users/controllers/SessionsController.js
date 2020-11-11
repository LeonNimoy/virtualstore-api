"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UsersRepository = _interopRequireDefault(require("../repositories/UsersRepository"));

var _AuthenticateUserService = _interopRequireDefault(require("../services/Authtenticate/AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async list(req, res) {
    const findUser = new _UsersRepository.default();
    const user = await findUser.findById(req.params.id);
    return res.status(200).json(user);
  }

  async create(req, res) {
    const {
      email,
      password
    } = req.body;

    const authenticateUser = _tsyringe.container.resolve(_AuthenticateUserService.default);

    const {
      token
    } = await authenticateUser.execute({
      email,
      password
    });
    return res.status(200).json({
      token
    });
  }

}

exports.default = SessionsController;