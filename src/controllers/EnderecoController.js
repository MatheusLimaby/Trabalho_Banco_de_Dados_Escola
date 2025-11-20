const express = require('express');
const router = express.Router();

const EnderecoModel = require('../models/EnderecoModel');
const { validarEndereco, validarEnderecoAtualizacao } = require('../validators/EnderecoValidator');
const { validarId } = require('../validators/IDvalidator');

// LISTAR TODOS
router.get('/enderecos', async (req, res) => {
  const enderecos = await EnderecoModel.find();
  res.json(enderecos);
});

// BUSCAR POR ID
router.get('/enderecos/:id', validarId, async (req, res) => {
  const endereco = await EnderecoModel.findById(req.params.id);

  if (!endereco) {
    return res.status(404).json({ message: 'Endereço não encontrado!' });
  }

  res.json(endereco);
});

// CRIAR
router.post('/enderecos', validarEndereco, async (req, res) => {
  const novoEndereco = await EnderecoModel.create(req.body);
  res.status(201).json(novoEndereco);
});

// ATUALIZAR
router.put('/enderecos/:id', validarId, validarEnderecoAtualizacao, async (req, res) => {
  const enderecoAtualizado = await EnderecoModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!enderecoAtualizado) {
    return res.status(404).json({ message: 'Endereço não encontrado!' });
  }

  res.json(enderecoAtualizado);
});

// DELETAR
router.delete('/enderecos/:id', validarId, async (req, res) => {
  const enderecoDeletado = await EnderecoModel.findByIdAndDelete(req.params.id);

  if (!enderecoDeletado) {
    return res.status(404).json({ message: 'Endereço não encontrado!' });
  }

  res.status(204).send();
});

module.exports = router;
