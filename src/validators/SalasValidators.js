const yup = require('yup');
const mongoose = require('mongoose');

const salaSchema = yup.object().shape({
    bloco: yup.string().required('O bloco da sala é obrigatório'),
    capacidade: yup.number().positive('A capacidade deve ser um número positivo').required('A capacidade da sala é obrigatória'),
    numero: yup.string().required('O número da sala é obrigatório'),
    tipo: yup.string().oneOf(
        ['Laboratório', 'Sala de Aula', 'Auditório', 'Sala de Reunião'],
        'Tipo de sala inválido'
    ).required('O tipo da sala é obrigatório')
});

idvalidator = yup.string().test(
    'is-objectid',
    'ID de sala inválido',
    value => mongoose.Types.ObjectId.isValid(value)
);

module.exports = {
    validateSala: async (data) => {
        try {
            await salaSchema.validate(data, { abortEarly: false });
            return { valid: true, errors: [] };
        } catch (err) {
            return {
                valid: false,
                errors: err.inner.map(e => e.message)
            };
        }
    }
};
