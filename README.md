# Trabalho_Banco_de_Dados_Escola.

Sistema de Gestão Escolar (API)

Este projeto consiste em uma API RESTful desenvolvida para o gerenciamento de uma instituição de ensino. O sistema permite o cadastro e controle de alunos, professores, cursos, disciplinas, turmas, notas, funcionários e departamentos, com validações de dados e relacionamentos entre as entidades.

Tecnologias Utilizadas

O sistema foi desenvolvido utilizando Node.js como ambiente de execução, Express para construção da API, MongoDB como banco de dados NoSQL orientado a documentos, Mongoose para modelagem e conexão com o banco, Yup para validação de dados de entrada, Dotenv para gerenciamento de variáveis de ambiente e Nodemon para reinício automático durante o desenvolvimento.

Descrição do Sistema

O sistema foi projetado para digitalizar processos acadêmicos e administrativos, atuando como backend de uma aplicação escolar. Ele abrange funcionalidades como matrícula de alunos, criação de cursos e disciplinas, lançamento de notas e frequência, cadastro de funcionários e professores, gerenciamento de salas de aula e alocação de turmas.

Funcionalidades Implementadas

Foram desenvolvidos CRUDs completos para todas as entidades, validação de dados com Yup para garantir envio de informações obrigatórias e formatos corretos, modelagem com relacionamentos entre collections (como cursos vinculados a professores e turmas associadas a salas e disciplinas) e tratamento padronizado de erros, como respostas 400 para erros de validação e 404 para recursos inexistentes.

Endpoints da API

URL base: http://localhost:3000

Exemplo de criação de curso (POST /cursos):
nome: Ciência da Computação
codigo: BCC
duracao_semestres: 8
professor_id: 64f8a...
descricao: Curso de bacharelado

Exemplo de criação de professor (POST /professores):
nome: Dr. Alan Turing
email: alan@escola.com

telefone: 11999999999
titulacao: professor
area_formacao: Matemática
data_nascimento: 1912-06-23

Exemplo de matrícula de aluno (POST /alunos):
nome: João Silva
matricula: 2023001
cpf: 12345678900
email: joao@email.com

telefone: 11988888888
data_nascimento: 2000-01-01
id_curso: 64f8b...
id_endereco: 64f8c...
status: cursando

Exemplo de cadastro de sala (POST /salas):
bloco: A
capacidade: 40
numero: 101
tipo: Sala de Aula

Exemplo de lançamento de nota (POST /notas):
aluno_id: ...
turma_id: ...
avaliacao: P1
nota: 8.5
frequencia: 90

Endpoints adicionais foram implementados para disciplinas, turmas, departamentos, funcionários, endereços e matrículas.

Diagrama de Modelagem

O modelo contém relações entre as principais entidades: alunos referenciam cursos e endereços; turmas conectam disciplina, professor e sala; notas relacionam aluno e turma; departamentos agrupam professores; funcionários são vinculados a departamentos; disciplinas pertencem a cursos e são ministradas por professores.

Instalação e Execução

Clonar o repositório, instalar dependências com npm install, configurar o arquivo .env com dados de conexão e executar o servidor com npm start. O servidor rodará em http://localhost:3000
.

Conexão com o Banco de Dados

A conexão é realizada via Mongoose no arquivo src/index.js, utilizando variáveis de ambiente para compor a string de conexão, garantindo segurança das credenciais e uso do MongoDB Atlas.

Equipe e Contribuições

Marcelo Wilson de Santana: Criar os CRUDs de Notas, Departamento, Endereço, Salas e Funcionário.

Matheus Lima Rodrigues: Criar o CRUD de Curso, Disciplina e Turma.

Vinicius Teixeira Campos: Conectar o projeto ao banco de dados MongoDB.

Kauã Henrique Santos: Criar os CRUDs de Alunos e Professores.

Ana Laura Castro: Realizar testes e implementar requisições no Postman.

