const express = require('express');
const cors = require('cors');
require('dotenv').config(); //le o .env e disponibiliza os seus conteudos

//caminhos, nada de mais
const provasRoutes = require('./routes/provas');
const exerciciosRoutes = require('./routes/exercicios');
const aulasRoutes = require('./routes/aulas');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // habilita permissão de chamadas entre front e back
app.use(express.json()); //parsing

// Rotas
app.use('/provas', provasRoutes);
app.use('/exercicios', exerciciosRoutes);
app.use('/aulas', aulasRoutes);

// Rota de teste
app.get('/', (req, res) => {
	res.json({ mensagem: 'UniPrep API a funcionar!' });
});

app.listen(PORT, () => {
	console.log(`Servidor a correr em http://localhost:${PORT}`);
});