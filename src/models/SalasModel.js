const mongoose = require('mongoose');

const SalaSchema = new mongoose.Schema({
    bloco: { type: String, required: true },
    capacidade: { type: Number, required: true },
    numero: { type: String, required: true },
    tipo: {
        type: String,
        enum: ['Laboratório', 'Sala de Aula', 'Auditório', 'Sala de Reunião'],
        required: true,
        default: 'Sala de Aula'
    }
}, { timestamps: true });

module.exports = mongoose.model('Sala', SalaSchema);
