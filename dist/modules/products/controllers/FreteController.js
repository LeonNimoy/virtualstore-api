"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _correiosBrasil = require("correios-brasil");

class FretesController {
  async search(req, res) {
    const args = {
      // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
      sCepOrigem: '81200100',
      sCepDestino: '21770200',
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '20',
      nVlLargura: '20',
      nCdServico: ['04014', '04510'],
      // Array com os códigos de serviço
      nVlDiametro: '0'
    };
    const correiosResponse = await (0, _correiosBrasil.calcularPrecoPrazo)(args);
    return res.status(200).json(correiosResponse);
  }

}

exports.default = FretesController;