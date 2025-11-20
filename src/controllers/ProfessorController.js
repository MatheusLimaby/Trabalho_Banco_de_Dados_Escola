const express = require('express');
const router = express.Router();

const ProfessorModel = require('../models/ProfessorModel');

const { validarIdProfessor } = require('../validators/IDProfessorValidator');
const {
  validarProfessor,
  validarProfessorAtualizacao
} = require('../validators/ProfessorValidator');

router.get('/professores', async (req, res) => {
  const professores = await ProfessorModel.find();
  res.json(professores);
});

router.get('/professores/:id', validarIdProfessor, async (req, res) => {
  const professor = await ProfessorModel.findById(req.params.id);
  if (!professor) {
    return res.status(404).json({ message: 'Professor não encontrado!' });
  }
  res.json(professor);
});

router.post('/professores', validarProfessor, async (req, res) => {
  const novoProfessor = await ProfessorModel.create(req.body);
  res.status(201).json(novoProfessor);
});

router.put('/professores/:id', validarIdProfessor, validarProfessorAtualizacao, async (req, res) => {
  const atualizado = await ProfessorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!atualizado) {
    return res.status(404).json({ message: 'Professor não encontrado!' });
  }
  res.json(atualizado);
});

router.delete('/professores/:id', validarIdProfessor, async (req, res) => {
  const deletado = await ProfessorModel.findByIdAndDelete(req.params.id);
  if (!deletado) {
    return res.status(404).json({ message: 'Professor não encontrado!' });
  }
  res.status(204).send();
});

module.exports = router;
