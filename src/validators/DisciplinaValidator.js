const yup = require('yup');

const disciplinaSchema = yup.object().shape({
  nome: yup
    .string()
    .required('O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),

  codigo: yup
    .string()
    .required('O código é obrigatório')
    .min(2, 'O código deve ter pelo menos 2 caracteres'),

  carga_horaria: yup
    .string()
    .required('A carga horária é obrigatória'),

  curso_id: yup
    .string()
    .required('O ID do curso é obrigatório'),

  professor_id: yup
    .string()
    .required('O ID do professor é obrigatório'),
});

async function validarDisciplina(req, res, next) {
  try {
    await disciplinaSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ erros: err.errors });
  }
}

const disciplinaAtualizarSchema = yup.object().shape({
  nome: yup.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  codigo: yup.string().min(2, 'O código deve ter pelo menos 2 caracteres'),
  carga_horaria: yup.string(),
  curso_id: yup.string(),
  professor_id: yup.string(),
});

async function validarDisciplinaAtualizacao(req, res, next) {
  try {
    await disciplinaAtualizarSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ erros: err.errors });
  }
}

module.exports = { validarDisciplina, validarDisciplinaAtualizacao };
