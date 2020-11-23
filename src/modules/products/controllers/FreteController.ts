import { Request, Response } from 'express';
import { calcularPrecoPrazo } from 'correios-brasil';

export default class FretesController {
  public async search(req: Request, res: Response): Promise<Response> {
    const args = {
      // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
      sCepOrigem: '81200100',
      sCepDestino: '21770200',
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '20',
      nVlLargura: '20',
      nCdServico: ['04014', '04510'], // Array com os códigos de serviço
      nVlDiametro: '0',
    };

    const correiosResponse = await calcularPrecoPrazo(args);

    return res.status(200).json(correiosResponse);
  }
}
