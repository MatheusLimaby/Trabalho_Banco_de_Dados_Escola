const yup = require('yup');

const matriculaSchema = yup.object().shape({
    aluno_id: yup.string().required('O ID do aluno é obrigatório'),
    curso_id: yup.string().required('O ID do curso é obrigatório'),
    data_matricula: yup.date().required('A data de matrícula é obrigatória'),
    status: yup.string().oneOf(
        ['Ativa', 'Trancada', 'Cancelada', 'Concluída'],
        'Status de matrícula inválido'
    ).required('O status da matrícula é obrigatório')
});

module.exports = {
    validateMatricula: async (data) => {
        try {
            await matriculaSchema.validate(data, { abortEarly: false });
            return { valid: true, errors: [] };
        } catch (err) {
            return {
                valid: false,
                errors: err.inner.map(e => e.message)
            };
        }
    }
};
s