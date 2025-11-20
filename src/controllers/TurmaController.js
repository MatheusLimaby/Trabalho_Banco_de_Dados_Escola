const express = require('express');
const router = express.Router();

const TurmaModel = require('../models/TurmaModel');
const { validarId } = require('../validators/IDValidator');
const { validarTurma, validarTurmaAtualizacao } = require('../validators/turmaValidator');

router.get('/turmas', async (req, res) => {
  const turmas = await TurmaModel.find().populate('disciplina_id professor_id sala_id');
  res.json(turmas);
});

router.get('/turmas/:id', validarId, async (req, res) => {
  const turma = await TurmaModel.findById(req.params.id)
    .populate('disciplina_id professor_id sala_id');

  if (!turma) {
    return res.status(404).json({ message: 'Turma não encontrada!' });
  }
  res.json(turma);
});

router.post('/turmas', validarTurma, async (req, res) => {
  const novaTurma = await TurmaModel.create(req.body);
  res.status(201).json(novaTurma);
});

router.put('/turmas/:id', validarId, validarTurmaAtualizacao, async (req, res) => {
  const updatedTurma = await TurmaModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updatedTurma) {
    return res.status(404).json({ message: 'Turma não encontrada!' });
  }
  res.json(updatedTurma);
});

router.delete('/turmas/:id', validarId, async (req, res) => {
  const deletedTurma = await TurmaModel.findByIdAndDelete(req.params.id);

  if (!deletedTurma) {
    return res.status(404).json({ message: 'Turma não encontrada!' });
  }
  res.status(204).send();
});

module.exports = router;
