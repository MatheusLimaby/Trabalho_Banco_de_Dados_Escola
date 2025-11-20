const yup = require('yup');

const cursoSchema = yup.object().shape({
  nome: yup.string().required().min(3),
  codigo: yup.string().required().min(2),
  duracao_semestres: yup.number().required().min(1),
  coordenador_id: yup.string().required(),
  descricao: yup.string().required().min(10),
});

async function validarCurso(req, res, next) {
  try {
    await cursoSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ erros: err.errors });
  }
}

const cursoAtualizarSchema = yup.object().shape({
  nome: yup.string().min(3),
  codigo: yup.string().min(2),
  duracao_semestres: yup.number().min(1),
  coordenador_id: yup.string(),
  descricao: yup.string().min(10),
});

async function validarCursoAtualizacao(req, res, next) {
  try {
    await cursoAtualizarSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ erros: err.errors });
  }
}

module.exports = { validarCurso, validarCursoAtualizacao };
