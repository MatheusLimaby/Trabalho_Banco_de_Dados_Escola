const express = require('express');
const router = express.Router();
const Matricula = require('../models/MatriculaModel');

// Criar uma nova matrícula
router.post('/', async (req, res) => {
    try {
        const matricula = new Matricula(req.body);
        const savedMatricula = await matricula.save();
        res.status(201).json(savedMatricula);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obter todas as matrículas

router.get('/', async (req, res) => {
    try {
        const matriculas = await Matricula.find();
        res.json(matriculas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);
// Obter uma matrícula por ID
router.get('/:id', async (req, res) => {
    try {
        const matricula = await Matricula.findById(req.params.id);
        if (!matricula) return res.status(404).json({ message: 'Matrícula não encontrada' });
        res.json(matricula);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);
// Atualizar uma matrícula por ID
router.put('/:id', async (req, res) => {
    const { aluno_id, curso_id, data_matricula, status } = req.body;
    try {
        const matricula = await Matricula.findByIdAndUpdate(
            req.params.id,
            { aluno_id, curso_id, data_matricula, status },
            { new: true }
        );
        if (!matricula) return res.status(404).json({ message: 'Matrícula não encontrada' });
        res.json(matricula);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const matricula = await Matricula.findByIdAndDelete(req.params.id);
        if (!matricula) return res.status(404).json({ message: 'Matrícula não encontrada' });
        res.json({ message: 'Matrícula deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;