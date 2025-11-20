const mongoose = require('mongoose');

async function validarIdProfessor(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }

  next();
}

module.exports = { validarIdProfessor };
