const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    matricula: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    data_nascimento: { type: Date, required: true },

    id_curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Cursos', required: true },
    id_endereco: { type: mongoose.Schema.Types.ObjectId, ref: 'Enderecos', required: true },

    status: { 
      type: String, 
      enum: ['cursando', 'trancado'], 
      required: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alunos', schema);
