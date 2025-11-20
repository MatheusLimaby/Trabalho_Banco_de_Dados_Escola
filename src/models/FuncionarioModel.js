const mongoose = require('mongoose');

const FuncionarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cargo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    cargo:{
        type: String,
        enum: ['Gerente', 'Assistente', 'Coordenador', 'Diretor', 'Analista'],
        required: true,
        default: 'Assistente'
    },
    departamento_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Departamento', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Funcionario', FuncionarioSchema);
