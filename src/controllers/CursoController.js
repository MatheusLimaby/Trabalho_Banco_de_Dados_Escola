const express = require('express');
const router = express.Router();

const CursoModel = require('../models/CursoModel');
const { validarId } = require('../validators/IDValidator');
const { validarCurso, validarCursoAtualizacao } = require('../validators/CursoValidator');

router.get('/cursos', async (req, res) => {
  const cursos = await CursoModel.find();
  res.json(cursos);
});

router.get('/cursos/:id', validarId, async (req, res) => {
  const curso = await CursoModel.findById(req.params.id);
  if (!curso) {
    return res.status(404).json({ message: 'Curso não encontrado!' });
  }
  res.json(curso);
});

router.post('/cursos', validarCurso, async (req, res) => {
  const novoCurso = await CursoModel.create(req.body);
  res.status(201).json(novoCurso);
});

router.put('/cursos/:id', validarId, validarCursoAtualizacao, async (req, res) => {
  const updatedCurso = await CursoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedCurso) {
    return res.status(404).json({ message: 'Curso não encontrado!' });
  }
  res.json(updatedCurso);
});

router.delete('/cursos/:id', validarId, async (req, res) => {
  const deletedCurso = await CursoModel.findByIdAndDelete(req.params.id);
  if (!deletedCurso) {
    return res.status(404).json({ message: 'Curso não encontrado!' });
  }
  res.status(204).send();
});

module.exports = router;
