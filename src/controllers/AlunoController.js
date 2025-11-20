const express = require('express');
const router = express.Router();

const AlunoModel = require('../models/AlunoModel');
const { validarId } = require('../validators/IDValidator');
const { validarAluno, validarAlunoAtualizacao } = require('../validators/AlunoValidator');

router.get('/alunos', async (req, res) => {
  const alunos = await AlunoModel.find();
  res.json(alunos);
});

router.get('/alunos/:id', validarId, async (req, res) => {
  const aluno = await AlunoModel.findById(req.params.id);
  if (!aluno) {
    return res.status(404).json({ message: 'Aluno não encontrado!' });
  }
  res.json(aluno);
});

router.post('/alunos', validarAluno, async (req, res) => {
  const novoAluno = await AlunoModel.create(req.body);
  res.status(201).json(novoAluno);
});

router.put('/alunos/:id', validarId, validarAlunoAtualizacao, async (req, res) => {
  const updatedAluno = await AlunoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedAluno) {
    return res.status(404).json({ message: 'Aluno não encontrado!' });
  }
  res.json(updatedAluno);
});

router.delete('/alunos/:id', validarId, async (req, res) => {
  const deletedAluno = await AlunoModel.findByIdAndDelete(req.params.id);
  if (!deletedAluno) {
    return res.status(404).json({ message: 'Aluno não encontrado!' });
  }
  res.status(204).send();
});

module.exports = router;
