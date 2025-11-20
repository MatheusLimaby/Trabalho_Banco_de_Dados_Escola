const mongoose = require('mongoose');

const DepartamentoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sigla: { type: String, required: true },
    tipo: {
        type: String,
        enum: ['Administrativo', 'Financeiro', 'Recursos Humanos', 'Tecnologia', 'Marketing'],
        required: true,
        default: 'Administrativo'
    },
    professores_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Professor' }]
}, { timestamps: true });


module.exports = mongoose.model('Departamento', DepartamentoSchema);

