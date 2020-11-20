/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/ban-types */

export interface Address {
  /** País. Duas letras minúsculas. Deve seguir o padrão `ISO 3166-1 alpha-2` */
  country: string;
  /** Estado */
  state: string;
  /** Cidade */
  city: string;
  /** Rua */
  street: string;
  /** Número */
  street_number?: string;
  /** Cidade */
  zipcode: string;
  /** Bairro */
  neighborhood?: string;
  /** Complemento. **Não pode ser uma string vazia** nem null */
  complementary?: string;
}

export interface Document {
  /** Tipo de documento. Para compradores brasileiros, deve ser fornecido ao menos um CPF (no caso de pessoa física, i.e. `individual`) ou CNPJ (no caso de pessoa jurídica, i.e. `corporation`). Para compradores internacionais, o documento pode ser um passaporte (type `passport`) ou um campo personalizado (type `other`). */
  type: DocumentType;
  /** Número do documento */
  number: string;
}

export interface ShippingInput {
  /** Nome da entidade de cobrança */
  name: string;
  /** Taxa de envio cobrada do comprador. Por exemplo, se a taxa de envio é de dez reais e três centavos (R$10,03), o valor deve ser fornecido como ‘1003’ */
  fee: number;
  /** Data de entrega. Estimativa fornecida no formato AAAA-MM-DD */
  delivery_date?: string;
  /** Entrega expressa. Se for entrega expressa, deve conter ‘true’ (sim). Caso contrário, deve conter ‘false’ (não) */
  expedited?: boolean;
  /** Obrigatório. Dados do endereço de envio. Objeto descrito aqui. */
  address: Address;
}

export interface ItemInput {
  /** SKU (unidade de manutenção de estoque) ou número de identificação na loja */
  id: string;
  /** Nome do item vendido. */
  title: string;
  /** Preço por unidade. Por exemplo, se o preço de cada item é vinte reais e seis centavos (R$20,06), o valor deve ser fornecido como ‘2006’ */
  unit_price: number;
  /** Número de unidades vendidas do produto */
  quantity: number;
  /** Caracteriza o produto como bem físico ou não. Por bem físico, entende-se produtos que devem ser enviados fisicamente ao comprador, como calçados, eletrônicos e brinquedos. Se for um bem físico deve conter true (sim). Caso contrário, deve conter false (não) */
  tangible: boolean;
  /** Categoria */
  category?: string;
  /** Local */
  venue?: string;
  /** Data Estimativa fornecida no formato AAAA-MM-DD */
  date?: string;
}

export interface BillingInput {
  name: string;
  address: Address;
}

enum Country {
  Af = 'af',
  Al = 'al',
  Dz = 'dz',
  As = 'as',
  Ad = 'ad',
  Ao = 'ao',
  Ai = 'ai',
  Aq = 'aq',
  Ag = 'ag',
  Ar = 'ar',
  Am = 'am',
  Aw = 'aw',
  Au = 'au',
  At = 'at',
  Az = 'az',
  Bs = 'bs',
  Bh = 'bh',
  Bd = 'bd',
  Bb = 'bb',
  By = 'by',
  Be = 'be',
  Bz = 'bz',
  Bj = 'bj',
  Bm = 'bm',
  Bt = 'bt',
  Bo = 'bo',
  Ba = 'ba',
  Bw = 'bw',
  Bv = 'bv',
  Br = 'br',
  Io = 'io',
  Bn = 'bn',
  Bg = 'bg',
  Bf = 'bf',
  Bi = 'bi',
  Kh = 'kh',
  Cm = 'cm',
  Ca = 'ca',
  Cv = 'cv',
  Ky = 'ky',
  Cf = 'cf',
  Td = 'td',
  Cl = 'cl',
  Cn = 'cn',
  Cx = 'cx',
  Cc = 'cc',
  Co = 'co',
  Km = 'km',
  Cg = 'cg',
  Cd = 'cd',
  Ck = 'ck',
  Cr = 'cr',
  Ci = 'ci',
  Hr = 'hr',
  Cu = 'cu',
  Cy = 'cy',
  Cz = 'cz',
  Dk = 'dk',
  Dj = 'dj',
  Dm = 'dm',
  Do = 'do',
  Ec = 'ec',
  Eg = 'eg',
  Sv = 'sv',
  Gq = 'gq',
  Er = 'er',
  Ee = 'ee',
  Et = 'et',
  Fk = 'fk',
  Fo = 'fo',
  Fj = 'fj',
  Fi = 'fi',
  Fr = 'fr',
  Gf = 'gf',
  Pf = 'pf',
  Tf = 'tf',
  Ga = 'ga',
  Gm = 'gm',
  Ge = 'ge',
  De = 'de',
  Gh = 'gh',
  Gi = 'gi',
  Gr = 'gr',
  Gl = 'gl',
  Gd = 'gd',
  Gp = 'gp',
  Gu = 'gu',
  Gt = 'gt',
  Gg = 'gg',
  Gn = 'gn',
  Gw = 'gw',
  Gy = 'gy',
  Ht = 'ht',
  Hm = 'hm',
  Va = 'va',
  Hn = 'hn',
  Hk = 'hk',
  Hu = 'hu',
  Is = 'is',
  In = 'in',
  Id = 'id',
  Ir = 'ir',
  Iq = 'iq',
  Ie = 'ie',
  Im = 'im',
  Il = 'il',
  It = 'it',
  Jm = 'jm',
  Jp = 'jp',
  Je = 'je',
  Jo = 'jo',
  Kz = 'kz',
  Ke = 'ke',
  Ki = 'ki',
  Kp = 'kp',
  Kr = 'kr',
  Kw = 'kw',
  Kg = 'kg',
  La = 'la',
  Lv = 'lv',
  Lb = 'lb',
  Ls = 'ls',
  Lr = 'lr',
  Ly = 'ly',
  Li = 'li',
  Lt = 'lt',
  Lu = 'lu',
  Mo = 'mo',
  Mk = 'mk',
  Mg = 'mg',
  Mw = 'mw',
  My = 'my',
  Mv = 'mv',
  Ml = 'ml',
  Mt = 'mt',
  Mh = 'mh',
  Mq = 'mq',
  Mr = 'mr',
  Mu = 'mu',
  Yt = 'yt',
  Mx = 'mx',
  Fm = 'fm',
  Md = 'md',
  Mc = 'mc',
  Mn = 'mn',
  Me = 'me',
  Ms = 'ms',
  Ma = 'ma',
  Mz = 'mz',
  Mm = 'mm',
  Na = 'na',
  Nr = 'nr',
  Np = 'np',
  Nl = 'nl',
  An = 'an',
  Nc = 'nc',
  Nz = 'nz',
  Ni = 'ni',
  Ne = 'ne',
  Ng = 'ng',
  Nu = 'nu',
  Nf = 'nf',
  Mp = 'mp',
  No = 'no',
  Om = 'om',
  Pk = 'pk',
  Pw = 'pw',
  Ps = 'ps',
  Pa = 'pa',
  Pg = 'pg',
  Py = 'py',
  Pe = 'pe',
  Ph = 'ph',
  Pn = 'pn',
  Pl = 'pl',
  Pt = 'pt',
  Pr = 'pr',
  Qa = 'qa',
  Re = 're',
  Ro = 'ro',
  Ru = 'ru',
  Rw = 'rw',
  Sh = 'sh',
  Kn = 'kn',
  Lc = 'lc',
  Pm = 'pm',
  Vc = 'vc',
  Ws = 'ws',
  Sm = 'sm',
  St = 'st',
  Sa = 'sa',
  Sn = 'sn',
  Rs = 'rs',
  Sc = 'sc',
  Sl = 'sl',
  Sg = 'sg',
  Sk = 'sk',
  Si = 'si',
  Sb = 'sb',
  So = 'so',
  Za = 'za',
  Gs = 'gs',
  Es = 'es',
  Lk = 'lk',
  Sd = 'sd',
  Sr = 'sr',
  Sj = 'sj',
  Sz = 'sz',
  Se = 'se',
  Ch = 'ch',
  Sy = 'sy',
  Tw = 'tw',
  Tj = 'tj',
  Tz = 'tz',
  Th = 'th',
  Tl = 'tl',
  Tg = 'tg',
  Tk = 'tk',
  To = 'to',
  Tt = 'tt',
  Tn = 'tn',
  Tr = 'tr',
  Tm = 'tm',
  Tc = 'tc',
  Tv = 'tv',
  Ug = 'ug',
  Ua = 'ua',
  Ae = 'ae',
  Gb = 'gb',
  Us = 'us',
  Um = 'um',
  Uy = 'uy',
  Uz = 'uz',
  Vu = 'vu',
  Ve = 've',
  Vn = 'vn',
  Vg = 'vg',
  Vi = 'vi',
  Wf = 'wf',
  Eh = 'eh',
  Ye = 'ye',
  Zm = 'zm',
  Zw = 'zw',
}

export type CustomerType = 'individual' | 'corporation' | 'other';
export type DocumentType = 'cpf' | 'cnpj' | 'passaporte' | 'other';

export interface CustomerInput {
  external_id: string;
  /** Nome ou razão social do comprador */
  name: string;
  /** Tipo de documento. Deve ser `individual` para pessoa física ou `corporation` para pessoa jurídica */
  type: CustomerType;
  /** País */
  country: Country;
  /** E-mail do comprador */
  email: string;
  /** Documento. Contém campos type para tipo de documento e number para número do documento. */
  documents: Document[];
  /** Números de telefone. Requer ao menos um valor. Deve seguir o padrão *E.164* */
  phone_numbers: string[];
  /** Data de nascimento */
  birthday?: string;
}

type RefuseStatus =
  | 'acquirer'
  | 'antifraud'
  | 'internal_error'
  | 'no_acquirer'
  | 'acquirer_timeout';

type TransactionStatus =
  | 'processing'
  | 'authorized'
  | 'paid'
  | 'refunded'
  | 'waiting_payment'
  | 'pending_refund'
  | 'refused'
  | 'chargedback'
  | 'analyzing'
  | 'pending_review';

/* eslint-disable @typescript-eslint/ban-types */
export default interface ITransactionDTO {
  /** Nome do tipo do objeto criado/modificado. */
  object: 'transaction';
  /** Representa o estado da transação. A cada atualização no processamento da transação, esta propriedade é alterada e, caso você esteja usando uma postback_url, os seus servidores são notificados desses updates. */
  status: TransactionStatus;
  /** Motivo pelo qual a transação foi recusada. */
  refuse_reason?: RefuseStatus;
  /** Agente responsável pela validação ou anulação da transação. */
  status_reason: RefuseStatus;
  /** Adquirente responsável pelo processamento da transação. */
  acquirer_name: 'development' | 'pagarme' | 'stone' | 'cielo' | 'rede';
  /** ID da adquirente responsável pelo processamento da transação. */
  acquirer_id: string;
  /** Mensagem de resposta da adquirente referente ao status da transação. */
  acquirer_response_code: string;
  /** Código de autorização retornado pela bandeira. */
  authorization_code: string;
  /** Texto que irá aparecer na fatura do cliente depois do nome da loja. */
  soft_descriptor: string | null;
  /** Código que identifica a transação na adquirente. */
  tid: string | number;
  /** Código que identifica a transação na adquirente. */
  nsu: string | number;
  /** Data de criação da transação no formato ISODate */
  date_created: string;
  /** Data de atualização  da transação no formato ISODate */
  date_updated: string;
  /** Valor, em centavos, da transação. Ex: 100,00 = 10000 */
  amount: number;
  /** Valor em centavos autorizado na transação, sempre menor ou igual a `amount`. */
  authorized_amount: number;
  /** Valor em centavos capturado na transação, sempre menor ou igual a `authorized_amount`. */
  paid_amount: number;
  /** Valor em centavos estornado até o momento na transação, sempre menor ou igual a `paidamount`. */
  refunded_amount: number;
  /** Número de parcelas a serem cobradas. */
  installments: number;
  /** Número identificador da transação */
  id?: number;
  /** Custo da transação para o lojista, envolvendo processamento e antifraude. */
  cost: number;
  /** Nome do portador do cartão. */
  card_holder_name: string;
  /** Últimos 4 dígitos do cartão. */
  card_last_digits: string;
  /** ÚPrimeiros 5 dígitos do cartão */
  card_first_digits: string;
  /** Bandeira do cartão. */
  card_brand: string;
  /** Usado em transações EMV, define se a validação do cartão aconteceu online(com banco emissor), ou offline( através do chip). */
  card_pin_mode: string | null;
  /** URL (endpoint) de seu sistema que recebe notificações a cada mudança no status da transação. */
  postback_url: string | null;
  /** Método de pagamento */
  payment_method: 'credit_card' | 'boleto';
  /** Define qual foi a forma de captura dos dados de pagamento. */
  capture_method: 'magstripe' | 'emv' | 'ecommerce';
  /** Define qual foi a nota de antifraude atribuída a transação. Lembrando que por padrão, transações com score >= 95 são recusadas. */
  antifraud_score: string | null;
  /** URL do boleto para impressão */
  boleto_url: string | null;
  /** Código de barras do boleto gerado na transação */
  boleto_barcode: string | null;
  /** Data de expiração do boleto (em ISODate) */
  boleto_expiration_date: string | null;
  /** Mostra se a transação foi criada utilizando a API Key ou Encryption Key */
  referer: string;
  /** IP de origem que criou a transação, podendo ser diretamente de seu cliente, caso a requisição venha diretamente do client-side, ou de seus servidores, caso tudo esteja centralizando em sua aplicação no server-side. */
  ip: string;
  /** Caso essa transação tenha sido originada na cobrança de uma assinatura, o id desta será o valor dessa propriedade. */
  subscription_id: string;
  customer: {
    external_id: string;
    /** Nome ou razão social do comprador */
    name: string;
    /** Tipo de documento. Deve ser `individual` para pessoa física ou `corporation` para pessoa jurídica */
    type: CustomerType;
    /** País */
    country: Country;
    /** E-mail do comprador */
    email: string;
    /** Documento. Contém campos type para tipo de documento e number para número do documento. */
    documents: Document[];
    /** Números de telefone. Requer ao menos um valor. Deve seguir o padrão *E.164* */
    phone_numbers: string[];
    /** Data de nascimento */
    birthday?: string;
  };
  billing: BillingInput;
  shipping: ShippingInput;
  items: ItemInput[];
  address: Address;
  documents: Document[];
  /** Objeto com dados adicionais informados na criação da transação. */
  metadata: any;
  /** Objeto com as regras de split definidas para essa transação. */
  split_rules: any;
  /** Objeto com dados usados na integração com antifraude. */
  antifraud_metadata: any;
  /** Valor único que identifica a sessão do usuário acessando o site */
  session: string;
  /** Valor único que identifica a transação para permitir uma nova tentativa de requisição com a segurança de que a mesma operação não será executada duas vezes acidentalmente. */
  reference_key: string;

  // object: string;
  // status: string;
  // refse_reason: null | string;
  // status_reason: string;
  // acquirer_response_code: string;
  // acquirer_name: string;
  // acquirer_id: string;
  // authorization_code: string;
  // soft_descriptor: null | string;
  // tid: number | string;
  // nsu: number | string;
  // date_created: string;
  // date_updated: string;
  // amount: number;
  // authorized_amount: number;
  // paid_amount: number;
  // refunded_amount: number;
  // installments: number;
  // id?: number;
  // cost: number;
  // card_holder_name: string;
  // card_last_digits: string;
  // card_first_digits: string;
  // card_brand: string;
  // card_pin_mode: null | string;
  // postback_url: null | string;
  // payment_method: string;
  // capture_method: string;
  // antifraud_score: null | string;
  // boleto_url: null | string;
  // boleto_barcode: null | string;
  // boleto_expiration_date: null | string;
  // referer: string;
  // ip: string;
  // subscription_id: null;
  // phone: null;
  // address: null;
  // customer: {
  //   object: string;
  //   id: number;
  //   external_id: string;
  //   type: string;
  //   country: string;
  //   document_number: null;
  //   document_type: string;
  //   name: string;
  //   email: string;
  //   phone_numbers: [string];
  //   born_at: null;
  //   birthday: string;
  //   gender: null;
  //   date_created: string;
  //   documents: [
  //     {
  //       object: string;
  //       id: string;
  //       type: string;
  //       number: string;
  //     },
  //   ];
  // };
  // billing: {
  //   address: {
  //     object: string;
  //     street: string;
  //     complementary: null;
  //     street_number: string;
  //     neighborhood: string;
  //     city: string;
  //     state: string;
  //     zipcode: string;
  //     country: string;
  //     id: number;
  //   };
  //   object: string;
  //   id: number;
  //   name: string;
  // };
  // shipping: {
  //   address: {
  //     object: string;
  //     street: string;
  //     complementary: null;
  //     street_number: string;
  //     neighborhood: string;
  //     city: string;
  //     state: string;
  //     zipcode: string;
  //     country: string;
  //     id: number;
  //   };
  //   object: string;
  //   id: number;
  //   name: string;
  //   fee: number;
  //   delivery_date: string;
  //   expedited: boolean;
  // };
  // items: [
  //   {
  //     object: string;
  //     id: string;
  //     title: string;
  //     unit_price: number;
  //     quantity: number;
  //     category: null;
  //     tangible: boolean;
  //     venue: null;
  //     date: null;
  //   },
  //   {
  //     object: string;
  //     id: string;
  //     title: string;
  //     unit_price: number;
  //     quantity: number;
  //     category: null;
  //     tangible: boolean;
  //     venue: null;
  //     date: null;
  //   },
  // ];
  // card: {
  //   object: string;
  //   id: string;
  //   date_created: string;
  //   date_updated: string;
  //   brand: string;
  //   holder_name: string;
  //   first_digits: string;
  //   last_digits: string;
  //   country: string;
  //   fingerprint: string;
  //   valid: boolean;
  //   expiration_date: string;
  // };
  // split_rules: null;
  // metadata: Object;
  // antifraud_metadata: Object;
  // reference_key: null;
}
