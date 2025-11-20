const express = require('express');
const mongoose = require('mongoose');

const notasSchema = new mongoose.Schema({
    aluno_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Aluno'
    },
    turma_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Turma'
    },
avalicacao: { type: String, required: true },
    nota: { type: Number, required: true, min: 0, max: 10 },
    frequencia: { type: Number, required: true, min: 0, max: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Notas', notasSchema);
