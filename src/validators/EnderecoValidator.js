const yup = require('yup');

const enderecoSchema = yup.object().shape({
  rua: yup.string().required("A rua é obrigatória"),
  numero: yup.string().required("O número é obrigatório"),
  bairro: yup.string().required("O bairro é obrigatório"),
  cidade: yup.string().required("A cidade é obrigatória"),
  estado: yup.string().required("O estado é obrigatório"),
  cep: yup.string().required("O CEP é obrigatório"),
});

async function validarEndereco(req, res, next) {
  try {
    await enderecoSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ erros: err.errors });
  }
}

const enderecoAtualizarSchema = yup.object().shape({
  rua: yup.string(),
  numero: yup.string(),
  bairro: yup.string(),
  cidade: yup.string(),
  estado: yup.string(),
  cep: yup.string(),
});

async function validarEnderecoAtualizacao(req, res, next) {
  try {
    await enderecoAtualizarSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ erros: err.errors });
  }
}

module.exports = { validarEndereco, validarEnderecoAtualizacao };
