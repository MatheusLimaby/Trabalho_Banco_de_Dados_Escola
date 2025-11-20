const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    codigo: { type: String, required: true },
    duracao_semestres: { type: Number, required: true },
    professor_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'professores' },
    descricao: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cursos', schema);
