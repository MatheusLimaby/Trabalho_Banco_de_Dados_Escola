const yup = require('yup');
const mongoose = require('mongoose');

const departamentoSchema = yup.object().shape({
    nome: yup.string().required('O nome do departamento é obrigatório'),
    sigla: yup.string().required('A sigla do departamento é obrigatória'),
    tipo: yup.string().oneOf(
        ['Administrativo', 'Financeiro', 'Recursos Humanos', 'Tecnologia', 'Marketing'],
        'Tipo de departamento inválido'
    ).required('O tipo do departamento é obrigatório'),
    professores_id: yup.array().of(yup.string().test(
        'is-objectid',
        'ID de professor inválido',
        value => mongoose.Types.ObjectId.isValid(value)
    ))
});

Idvalidator = yup.string().test(
    'is-objectid',
    'ID de departamento inválido',
    value => mongoose.Types.ObjectId.isValid(value)
);

module.exports = {
    validateDepartamento: async (data) => {
        try {
            await departamentoSchema.validate(data, { abortEarly: false });
            return { valid: true, errors: [] };
        } catch (err) {
            return {
                valid: false,
                errors: err.inner.map(e => e.message)
            };
        }
    }
};

