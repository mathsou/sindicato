const express = require('express');
const routes = express.Router();
const connection = require('./database/connection');

const pessoaController = require('./controllers/pessoaController');
const modalidadeController = require('./controllers/modalidadeController');
const descontoController = require('./controllers/descontoController');
const praticaModalidadeController = require('./controllers/praticaModalidadeController');

routes.post('/cadastro', pessoaController.create);
routes.post('/modalidade', modalidadeController.create);
routes.post('/desconto', descontoController.create);
routes.post('/praticaModalidade', praticaModalidadeController.create);

routes.get('/cadastro', pessoaController.index);
routes.get('/modalidade', modalidadeController.index);
routes.get('/desconto', descontoController.index);
routes.get('/praticaModalidade', praticaModalidadeController.index);

routes.put('/modalidade', modalidadeController.modify);

routes.delete('/praticaModalidade', praticaModalidadeController.delete);

module.exports = routes;