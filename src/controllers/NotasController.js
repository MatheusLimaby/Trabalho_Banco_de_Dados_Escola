const express = require('express');

const router = express.Router();
const Notas = require('../models/NotasModel');
const mongoose = require('mongoose');

// Criar uma nova nota
router.post('/', async (req, res) => {
    try {
        const novaNota = new Notas(req.body);
        const resultado = await novaNota.save();
        res.status(201).json(resultado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Obter todas as notas

router.get('/', async (req, res) => {
    try {
        const notas = await Notas.find();
        res.status(200).json(notas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
);
// Obter uma nota por ID

router.get('/:id', async (req, res) => {
    try {
        const nota = await Notas.findById(req.params.id);
        if (!nota) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }
        res.status(200).json(nota);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
);
// Atualizar uma nota por ID    

router.put('/:id', async (req, res) => {
    try {
        const notaAtualizada = await Notas.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!notaAtualizada) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }
        res.status(200).json(notaAtualizada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
);
// Deletar uma nota por ID
router.delete('/:id', async (req, res) => {
    try {
        const notaDeletada = await Notas.findByIdAndDelete(req.params.id);
        if (!notaDeletada) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }
        res.status(200).json({ message: 'Nota deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
);
module.exports = router;
