const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    codigo: { type: String, required: true },
    carga_horaria: { type: String, required: true },
    curso_id: { type: mongoose.Schema.Types.ObjectId, ref: 'cursos', required: true },
    professor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'professores', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Disciplinas', schema);
