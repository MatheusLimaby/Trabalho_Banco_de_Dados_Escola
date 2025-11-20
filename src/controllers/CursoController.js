const express = require('express');
const router = express.Router();

const CursoModel = require('../models/CursoModel');
const { validarCurso, validarCursoAtualizacao } = require('../validators/CursoValidator');
const { validarId } = require('../validators/IDvalidator');

// LISTAR TODOS
router.get('/cursos', async (req, res) => {
  const cursos = await CursoModel.find().populate('professor_id');
  res.json(cursos);
});

// BUSCAR POR ID
router.get('/cursos/:id', validarId, async (req, res) => {
  const curso = await CursoModel.findById(req.params.id).populate('professor_id');

  if (!curso) {
    return res.status(404).json({ message: 'Curso não encontrado!' });
  }

  res.json(curso);
});

// CRIAR
router.post('/cursos', validarCurso, async (req, res) => {
  const novoCurso = await CursoModel.create(req.body);
  res.status(201).json(novoCurso);
});

// ATUALIZAR
router.put('/cursos/:id', validarId, validarCursoAtualizacao, async (req, res) => {
  const cursoAtualizado = await CursoModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!cursoAtualizado) {
    return res.status(404).json({ message: 'Curso não encontrado!' });
  }

  res.json(cursoAtualizado);
});

// DELETAR
router.delete('/cursos/:id', validarId, async (req, res) => {
  const cursoDeletado = await CursoModel.findByIdAndDelete(req.params.id);

  if (!cursoDeletado) {
    return res.status(404).json({ message: 'Curso não encontrado!' });
  }

  res.status(204).send();
});

module.exports = router;
