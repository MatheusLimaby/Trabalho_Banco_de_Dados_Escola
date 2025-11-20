const express = require('express');
const router = express.Router();
const Funcionario = require('../models/FuncionarioModel');

// Criar um novo funcionário
router.post('/', async (req, res) => {
    try {
        const funcionario = new Funcionario(req.body);
        const savedFuncionario = await funcionario.save();
        res.status(201).json(savedFuncionario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obter todos os funcionários

router.get('/', async (req, res) => {
    try {
        const funcionarios = await Funcionario.find();
        res.json(funcionarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

// Obter um funcionário por ID

router.get('/:id', async (req, res) => {
    try {
        const funcionario = await Funcionario.findById(req.params.id);
        if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado' });
        res.json(funcionario);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Atualizar um funcionário por ID

router.put('/:id', async (req, res) => {
    const { nome, cargo, departamento_id, salario } = req.body;
    try {
        const funcionario = await Funcionario.findByIdAndUpdate(
            req.params.id,
            { nome, cargo, departamento_id, salario },
            { new: true }
        );
        if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado' });
        res.json(funcionario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const funcionario = await Funcionario.findByIdAndDelete(req.params.id);
        if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado' });
        res.json({ message: 'Funcionário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
