"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = new _mongoose.default.Schema({
  object: {
    type: String
  },
  status: {
    type: String
  },
  refse_reason: {
    type: String
  },
  status_reason: {
    type: String
  },
  acquirer_response_code: {
    type: String
  },
  acquirer_name: {
    type: String
  },
  acquirer_id: {
    type: String
  },
  authorization_code: {
    type: String
  },
  soft_descriptor: {
    type: String
  },
  tid: {
    type: Number
  },
  nsu: {
    type: Number
  },
  date_created: {
    type: String
  },
  date_updated: {
    type: String
  },
  amount: {
    type: Number
  },
  authorized_amount: {
    type: Number
  },
  paid_amount: {
    type: Number
  },
  refunded_amount: {
    type: Number
  },
  installments: {
    type: Number
  },
  id: {
    type: Number
  },
  cost: {
    type: Number
  },
  card_holder_name: {
    type: String
  },
  card_last_digits: {
    type: String
  },
  card_first_digits: {
    type: String
  },
  card_brand: {
    type: String
  },
  card_pin_mode: {
    type: String
  },
  postback_url: {
    type: String
  },
  payment_method: {
    type: String
  },
  capture_method: {
    type: String
  },
  antifraud_score: {
    type: String
  },
  boleto_url: {
    type: String
  },
  boleto_barcode: {
    type: String
  },
  boleto_expiration_date: {
    type: String
  },
  referer: {
    type: String
  },
  ip: {
    type: String
  },
  subscription_id: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  customer: {
    object: {
      type: String
    },
    id: {
      type: Number
    },
    external_id: {
      type: String
    },
    type: {
      type: String
    },
    country: {
      type: String
    },
    document_number: {
      type: String
    },
    document_type: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String
    },
    phone_numbers: [String],
    born_at: {
      type: String
    },
    birthday: {
      type: String
    },
    gender: {
      type: String
    },
    date_created: {
      type: String
    },
    documents: [{
      object: {
        type: String
      },
      id: {
        type: String
      },
      type: {
        type: String
      },
      number: {
        type: String
      }
    }]
  },
  billing: {
    address: {
      object: {
        type: String
      },
      street: {
        type: String
      },
      complementary: {
        type: String
      },
      street_number: {
        type: String
      },
      neighborhood: {
        type: String
      },
      city: {
        type: String
      },
      state: {
        type: String
      },
      zipcode: {
        type: String
      },
      country: {
        type: String
      },
      id: {
        type: Number
      }
    },
    object: {
      type: String
    },
    id: {
      type: Number
    },
    name: {
      type: String
    }
  },
  shipping: {
    address: {
      object: {
        type: String
      },
      street: {
        type: String
      },
      complementary: {
        type: String
      },
      street_number: {
        type: String
      },
      neighborhood: {
        type: String
      },
      city: {
        type: String
      },
      state: {
        type: String
      },
      zipcode: {
        type: String
      },
      country: {
        type: String
      },
      id: {
        type: Number
      }
    },
    object: {
      type: String
    },
    id: {
      type: Number
    },
    name: {
      type: String
    },
    fee: {
      type: Number
    },
    delivery_date: {
      type: String
    },
    expedited: {
      type: Boolean
    }
  },
  items: [{
    object: {
      type: String
    },
    id: {
      type: String
    },
    title: {
      type: String
    },
    unit_price: {
      type: Number
    },
    quantity: {
      type: Number
    },
    category: {
      type: String
    },
    tangible: {
      type: Boolean
    },
    venue: {
      type: String
    },
    date: {
      type: String
    }
  }, {
    object: {
      type: String
    },
    id: {
      type: String
    },
    title: {
      type: String
    },
    unit_price: {
      type: Number
    },
    quantity: {
      type: Number
    },
    category: {
      type: String
    },
    tangible: {
      type: Boolean
    },
    venue: {
      type: String
    },
    date: {
      type: String
    }
  }],
  card: {
    object: {
      type: String
    },
    id: {
      type: String
    },
    date_created: {
      type: String
    },
    date_updated: {
      type: String
    },
    brand: {
      type: String
    },
    holder_name: {
      type: String
    },
    first_digits: {
      type: String
    },
    last_digits: {
      type: String
    },
    country: {
      type: String
    },
    fingerprint: {
      type: String
    },
    valid: {
      type: Boolean
    },
    expiration_date: {
      type: String
    }
  },
  split_rules: {
    type: String
  },
  metadata: {
    type: Object
  },
  antifraud_metadata: {
    type: Object
  },
  reference_key: {
    type: String
  }
}, {
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

const TransactionSchema = _mongoose.default.model('Transaction', schema);

var _default = TransactionSchema;
exports.default = _default;