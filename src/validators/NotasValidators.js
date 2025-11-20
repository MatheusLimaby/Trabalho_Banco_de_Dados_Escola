const yup = require('yup');
const mongoose = require('mongoose');

const notasSchema = yup.object().shape({
    aluno_id: yup.string().test(
        'is-objectid',
        'ID de aluno inválido',
        value => mongoose.Types.ObjectId.isValid(value)
    ).required('O ID do aluno é obrigatório'),
    turma_id: yup.string().test(
        'is-objectid',
        'ID de turma inválido',
        value => mongoose.Types.ObjectId.isValid(value)
    ).required('O ID da turma é obrigatório'),
    avaliacao: yup.string().required('A avaliação é obrigatória'),
    nota: yup.number().min(0, 'A nota mínima é 0').max(10, 'A nota máxima é 10').required('A nota é obrigatória'),
    frequencia: yup.number().min(0, 'A frequência mínima é 0').max(100, 'A frequência máxima é 100').required('A frequência é obrigatória')
});

module.exports = {
    validateNotas: async (data) => {
        try {
            await notasSchema.validate(data, { abortEarly: false });
            return { valid: true, errors: [] };
        } catch (err) {
            return {
                valid: false,
                errors: err.inner.map(e => e.message)
            };
        }
    }
};
