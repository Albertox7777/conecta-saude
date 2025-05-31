// server.js

// 1. Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

// 2. Importar módulos necessários
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); 

// 3. Importar Rotas da API
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');
const calendarRoutes = require('./routes/calendarRoutes'); // Se for usar

// 4. Inicializar o Express
const app = express();
const PORT = process.env.PORT || 3000;

// 5. Configurar o CORS (Cross-Origin Resource Sharing)
app.use(cors({
    origin: 'http://localhost:3000', // Permite requisições do frontend local
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 6. Middleware para parsear JSON e URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 7. Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'public')));

// 8. Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/calendar', calendarRoutes); // Se for usar

// 9. Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Conectado com Sucesso!');
        app.listen(PORT, () => {
            console.log('Servidor rodando na porta ${PORT}');
            console.log('Acesse o frontend em: http://localhost:${PORT}');
        });
    })
    .catch(err => {
        console.error('Erro de Conexão com MongoDB:', err.message);
        console.error('Por favor, verifique sua MONGO_URI no arquivo .env');
        process.exit(1);
    });

// 10. Rota para servir o index.html como página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 11. Rota Catch-all para outras páginas do frontend
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.includes('.')) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        res.status(404).send('Página não encontrada ou Recurso não encontrado.');
    }
});