const express = require('express');
const routes = express.Router();
const connection = require('./database/connection');

const sociosController = require('./controllers/sociosController');
const agendamentoController = require('./controllers/agendamentoController');
const eventosController = require('./controllers/eventosController');
const pdfController = require('./controllers/pdfController');

routes.post('/socios', sociosController.create);
routes.post('/agendamento', agendamentoController.create);
routes.post('/eventos', eventosController.create);
routes.post('/pdf',pdfController.create);

routes.get('/socios', sociosController.index);
routes.get('/agendamento', agendamentoController.index);
routes.get('/agendamento/:id', agendamentoController.index);
routes.get('/eventos', eventosController.index);


module.exports = routes;