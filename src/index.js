
const express = require('express')
const app = express()

app.use(express.json())

// conexão com o banco de dados
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
  .then(() => {
    console.log("Conectado ao MongoDB")
  })
  .catch(err => {
    console.log("Erro ao conectar no banco MongoDB: ", err)
  })
// rotas


//Marcelo
const ProfessorController = require("./controllers/ProfessorController");
const DisciplinaController = require("./controllers/DisciplinaController");

app.use(ProfessorController);
app.use(DisciplinaController);
//Vinicius
const AlunoController = require('./controllers/AlunoController');
app.use(AlunoController);




//Kauã
const SalasRoutes = require('./controllers/SalasController');
const DepartamentoRoutes = require('./controllers/DepartamentoController');
const NotasRoutes = require('./controllers/NotasController');



app.use('/salas', SalasRoutes)
app.use('/departamentos', DepartamentoRoutes);
app.use('/notas', NotasRoutes);



//Ana 
const FuncionarioRoutes = require("./controllers/FuncionarioController")
const MatriculaRoutes = require("./controllers/MatriculaController")

app.use('/funcionario', FuncionarioRoutes)
app.use('/matricula', MatriculaRoutes)


//Matheus
const TurmaController = require('./controllers/TurmaController');
app.use(TurmaController);
const EnderecoController = require('./controllers/EnderecoController');
app.use(EnderecoController);
const CursoController = require('./controllers/CursoController');
app.use(CursoController);
app.listen(3000, () => {
  console.log("API-EMPRESAS Rodando em http://localhost:3000")
})
