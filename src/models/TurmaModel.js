const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    disciplina_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Disciplinas' },
    professor_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Professores' },
    semestre: { type: String, required: true },
    dia: { type: String, required: true },
    inicio: { type: String, required: true },
    fim: { type: String, required: true },
    sala_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Sala' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Turmas', schema);
