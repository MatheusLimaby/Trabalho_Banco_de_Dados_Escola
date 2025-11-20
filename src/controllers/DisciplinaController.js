const express = require("express");
const router = express.Router();

const DisciplinaModel = require("../models/DisciplinaModel");

const {
  validarDisciplina,
  validarDisciplinaAtualizacao,
} = require("../validators/DisciplinaValidator");

// 🔹 Criando o IDValidator local (sem arquivo separado)
const validarIdDisciplina = (req, res, next) => {
  const mongoose = require("mongoose");

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "ID da disciplina inválido!" });
  }

  next();
};

// GET - listar todas
router.get("/disciplinas", async (req, res) => {
  const disciplinas = await DisciplinaModel.find();
  res.json(disciplinas);
});

// GET - listar por ID
router.get("/disciplinas/:id", validarIdDisciplina, async (req, res) => {
  const disciplina = await DisciplinaModel.findById(req.params.id);

  if (!disciplina) {
    return res.status(404).json({ message: "Disciplina não encontrada!" });
  }

  res.json(disciplina);
});

// POST - criar
router.post("/disciplinas", validarDisciplina, async (req, res) => {
  const novaDisciplina = await DisciplinaModel.create(req.body);
  res.status(201).json(novaDisciplina);
});

// PUT - atualizar
router.put(
  "/disciplinas/:id",
  validarIdDisciplina,
  validarDisciplinaAtualizacao,
  async (req, res) => {
    const atualizada = await DisciplinaModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!atualizada) {
      return res.status(404).json({ message: "Disciplina não encontrada!" });
    }

    res.json(atualizada);
  }
);

// DELETE - remover
router.delete("/disciplinas/:id", validarIdDisciplina, async (req, res) => {
  const removida = await DisciplinaModel.findByIdAndDelete(req.params.id);

  if (!removida) {
    return res.status(404).json({ message: "Disciplina não encontrada!" });
  }

  res.status(204).send();
});

module.exports = router;
