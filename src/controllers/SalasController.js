const express = require('express');
const router = express.Router();

const Sala = require('../models/SalasModel');
// Criar uma nova sala
router.post('/', async (req, res) => {
    try {
        const sala = new Sala(req.body);
        const savedSala = await sala.save();
        res.status(201).json(savedSala);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Obter todas as salas
router.get('/', async (req, res) => {
    try {
        const salas = await Sala.find();
        res.json(salas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Obter uma sala por ID
router.get('/:id', async (req, res) => {
    try {
        const sala = await Sala.findById(req.params.id);
        if (!sala) return res.status(404).json({ message: 'Sala não encontrada' });
        res.json(sala);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Atualizar uma sala por ID

router.put('/:id', async (req, res) => {
    const { bloco, capacidade, numero, tipo } = req.body;
    try {
        const sala = await Sala.findByIdAndUpdate(
            req.params.id,
            { bloco, capacidade, numero, tipo },
            { new: true }
        );
        if (!sala) return res.status(404).json({ message: 'Sala não encontrada' });
        res.json(sala);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const sala = await Sala.findByIdAndDelete(req.params.id);
        if (!sala) return res.status(404).json({ message: 'Sala não encontrada' });
        res.json({ message: 'Sala deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
