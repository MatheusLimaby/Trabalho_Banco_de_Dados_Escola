const yup = require('yup');

const turmaSchema = yup.object().shape({
  disciplina_id: yup.string().required("O ID da disciplina é obrigatório"),
  professor_id: yup.string().required("O ID do professor é obrigatório"),
  semestre: yup.string().required("O semestre é obrigatório"),
  dia: yup.string().required("O dia da semana é obrigatório"),
  inicio: yup.string().required("O horário de início é obrigatório"),
  fim: yup.string().required("O horário de fim é obrigatório"),
  sala_id: yup.string().required("O ID da sala é obrigatório"),
});

async function validarTurma(req, res, next) {
  try {
    await turmaSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ erros: err.errors });
  }
}

const turmaAtualizarSchema = yup.object().shape({
  disciplina_id: yup.string(),
  professor_id: yup.string(),
  semestre: yup.string(),
  dia: yup.string(),
  inicio: yup.string(),
  fim: yup.string(),
  sala_id: yup.string(),
});

async function validarTurmaAtualizacao(req, res, next) {
  try {
    await turmaAtualizarSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ erros: err.errors });
  }
}

module.exports = { validarTurma, validarTurmaAtualizacao };
