const yup = require('yup');

const professorSchema = yup.object().shape({
  nome: yup
    .string()
    .required('O nome do professor é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),

  email: yup
    .string()
    .required('O email é obrigatório')
    .email('Formato de email inválido'),

  telefone: yup
    .string()
    .required('O telefone é obrigatório')
    .min(8, 'Telefone inválido'),

  titulacao: yup
    .string()
    .required('A titulação é obrigatória')
    .oneOf(['coordenador', 'professor'], 'Titulação inválida'),

  area_formacao: yup
    .string()
    .required('Área de formação obrigatória'),

  data_nascimento: yup
    .date()
    .required('Data de nascimento obrigatória'),
});

async function validarProfessor(req, res, next) {
  try {
    await professorSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ erros: err.errors });
  }
}

const professorAtualizarSchema = yup.object().shape({
  nome: yup.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: yup.string().email('Formato de email inválido'),
  telefone: yup.string().min(8, 'Telefone inválido'),
  titulacao: yup.string().oneOf(['coordenador', 'professor']),
  area_formacao: yup.string(),
  data_nascimento: yup.date(),
});

async function validarProfessorAtualizacao(req, res, next) {
  try {
    await professorAtualizarSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ erros: err.errors });
  }
}

module.exports = { validarProfessor, validarProfessorAtualizacao };
