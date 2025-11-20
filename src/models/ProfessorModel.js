const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    titulacao: {
      type: String,
      required: true,
      enum: ['coordenador', 'professor']
    },
    area_formacao: { type: String, required: true },
    data_nascimento: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Professores', schema);
