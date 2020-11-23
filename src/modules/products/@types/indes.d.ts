declare module 'correios-brasil' {

  export interface IArgs {

      // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
  sCepOrigem: string,
  sCepDestino: string,
  nVlPeso: string,
  nCdFormato: string,
  nVlComprimento: string,
  nVlAltura: string,
  nVlLargura: string,
  nCdServico: [string], // Array com os códigos de serviço
  nVlDiametro: string,
    }

    interface IFreteResponse {

        Codigo: '04014',
        Valor: '53,10',
        PrazoEntrega: '8',
        ValorSemAdicionais: '53,10',
        ValorMaoPropria: '0,00',
        ValorAvisoRecebimento: '0,00',
        ValorDeclarado: '0,00',
        EntregaDomiciliar: 'S',
        EntregaSabado: 'S',
        obsFim: 'O CEP de destino está sujeito a condições especiais de entrega  pela  ECT e será realizada com o acréscimo de até 7 (sete) dias úteis ao prazo regular.',
        Erro: '011',
        MsgErro: 'O CEP de destino está sujeito a condições especiais de entrega  pela  ECT e será realizada com o acréscimo de até 7 (sete) dias úteis ao prazo regular.'

    }


  }
  export interface calcularPrecoPrazo {
    function (productData:IArgs): Promise<typeof IFreteResponse>;
}
