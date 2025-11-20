const yup = require('yup');

const alunoSchema = yup.object().shape({
  nome: yup.string().required().min(3),
  matricula: yup.string().required().min(3),
  cpf: yup.string().required().min(11).max(14),
  email: yup.string().required().email(),
  telefone: yup.string().required(),
  data_nascimento: yup.date().required(),

  id_curso: yup.string().required(),
  id_endereco: yup.string().required(),

  status: yup.string().oneOf(['cursando', 'trancado']).required(),
});

async function validarAluno(req, res, next) {
  try {
    await alunoSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ erros: err.errors });
  }
}

const alunoAtualizarSchema = yup.object().shape({
  nome: yup.string().min(3),
  matricula: yup.string().min(3),
  cpf: yup.string().min(11).max(14),
  email: yup.string().email(),
  telefone: yup.string(),
  data_nascimento: yup.date(),

  id_curso: yup.string(),
  id_endereco: yup.string(),

  status: yup.string().oneOf(['cursando', 'trancado']),
});

async function validarAlunoAtualizacao(req, res, next) {
  try {
    await alunoAtualizarSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ erros: err.errors });
  }
}

module.exports = { validarAluno, validarAlunoAtualizacao };
