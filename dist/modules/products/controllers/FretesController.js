"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _correiosBrasil = require("correios-brasil");

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
class FretesController {
  async search(req, res) {
    const {
      destino
    } = req.query;
    const destinoStringify = String(destino);
    const args = {
      // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
      sCepOrigem: '81200100',
      sCepDestino: destinoStringify,
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '20',
      nVlLargura: '20',
      nCdServico: ['04014'],
      // Array com os códigos de serviço
      nVlDiametro: '0'
    };
    const freteCalculated = await (0, _correiosBrasil.calcularPrecoPrazo)(args);
    return res.status(200).json(freteCalculated);
  }

}

exports.default = FretesController;