const yup = require('yup');

const cursoSchema = yup.object().shape({
  nome: yup.string().required("O nome do curso é obrigatório"),
  codigo: yup.string().required("O código do curso é obrigatório"),
  duracao_semestres: yup.number().required("A duração em semestres é obrigatória"),
  professor_id: yup.string().required("O ID do professor é obrigatório"),
  descricao: yup.string().required("A descrição é obrigatória")
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
  nome: yup.string(),
  codigo: yup.string(),
  duracao_semestres: yup.number(),
  professor_id: yup.string(),
  descricao: yup.string()
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
