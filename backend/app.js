const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Notas = require('./models/notas');

mongoose.connect('mongodb+srv://lcastro:hudixo1525@cluster0.4sbfx.mongodb.net/app-mean?retryWrites=true&w=majority')
    .then(() => {
        console.log("Conexão OK")
    }).catch(() => {
        console.log("Conexão NOK")
    });

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept ');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.get('/api/notas', (req, res, next) => {
    Notas.find().then(
        Lista => {
            res.status(200).json({
                mensagem: "Tudo OK",
                notas: Lista
            });
        })
});

app.post('/api/notas', (req, res, next) => {
    const notas = new Notas({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        data: req.body.data
    })
    nota.save();
    console.log(notas);
    res.status(201).json({ mensagem: 'notainserido' })
});

app.use('/api/notas', (req, res, next) => {
    res.status(200).json({
        mensagem: "Sucesso",
        notas : Notas
    });
});
module.exports = app;
