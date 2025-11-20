const yup = require('yup');
const mongoose = require('mongoose');

const funcionarioSchema = yup.object().shape({
    nome: yup.string().required('O nome do funcionário é obrigatório'),
    cargo: yup.string().required('O cargo do funcionário é obrigatório'),
    departamento_id: yup.string().test(
        'is-objectid',
        'ID de departamento inválido',
        value => mongoose.Types.ObjectId.isValid(value)
    ).required('O ID do departamento é obrigatório'),
    email: yup.string().email('Email inválido').required('O email do funcionário é obrigatório'),
    telefone: yup.string().required('O telefone do funcionário é obrigatório'),
    cargo: yup.string().oneOf(
        ['Gerente', 'Assistente', 'Coordenador', 'Diretor', 'Analista'],
        'Cargo inválido'
    ).required('O cargo do funcionário é obrigatório')
});

idvalidator = yup.string().test(
    'is-objectid',
    'ID de funcionário inválido',
    value => mongoose.Types.ObjectId.isValid(value)
);

module.exports = {
    validateFuncionario: async (data) => {
        try {
            await funcionarioSchema.validate(data, { abortEarly: false });
            return { valid: true, errors: [] };
        } catch (err) {
            return {
                valid: false,
                errors: err.inner.map(e => e.message)
            };
        }
    }
};
