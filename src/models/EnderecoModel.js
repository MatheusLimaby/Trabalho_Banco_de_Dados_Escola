const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    rua: { type: String, required: true },
    numero: { type: String, required: true },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    cep: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enderecos', schema);
