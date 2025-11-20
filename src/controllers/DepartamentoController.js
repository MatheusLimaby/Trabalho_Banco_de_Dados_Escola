const express = require('express');
const router = express.Router();
const Departamento = require('../models/DepartamentoModel');

// Criar um novo departamento

router.post('/', async (req, res) => {
    try {
        const departamento = new Departamento(req.body);
        const savedDepartamento = await departamento.save();
        res.status(201).json(savedDepartamento);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obter todos os departamentos

router.get('/', async (req, res) => {
    try {
        const departamentos = await Departamento.find();
        res.json(departamentos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obter um departamento por ID

router.get('/:id', async (req, res) => {
    try {
        const departamento = await Departamento.findById(req.params.id);
        if (!departamento) return res.status(404).json({ message: 'Departamento não encontrado' });
        res.json(departamento);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

// Atualizar um departamento por ID
router.put('/:id', async (req, res) => {
    const { nome, sigla, tipo } = req.body;
    try {
        const departamento = await Departamento.findByIdAndUpdate(
            req.params.id,
            { nome, sigla, tipo },
            { new: true }
        );
        if (!departamento) return res.status(404).json({ message: 'Departamento não encontrado' });
        res.json(departamento);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const departamento = await Departamento.findByIdAndDelete(req.params.id);
        if (!departamento) return res.status(404).json({ message: 'Departamento não encontrado' });
        res.json({ message: 'Departamento deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

