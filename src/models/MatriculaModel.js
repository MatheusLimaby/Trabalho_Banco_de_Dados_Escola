const mongoose = require('mongoose');

const MatriculaSchema = new mongoose.Schema({
    data_matricula: { type: Date, required: true, default: Date.now },
    aluno_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true },
    curso_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true },
    status: {
        type: String,
        enum: ['Ativa', 'Trancada', 'Cancelada', 'Concluída'],
        required: true,
        default: 'Ativa'
    }
}, { timestamps: true });

module.exports = mongoose.model('Matricula', MatriculaSchema);
