const express = require('express');
const routes = express.Router();
const connection = require('./database/connection');

const sociosController = require('./controllers/sociosController');
const agendamentoController = require('./controllers/agendamentoController');
const eventosController = require('./controllers/eventosController');

routes.post('/socios', sociosController.create);
routes.post('/agendamento', agendamentoController.create);
routes.post('/eventos', eventosController.create);

routes.get('/socios', sociosController.index);
routes.get('/agendamento', agendamentoController.index);
routes.get('/eventos', eventosController.index);


module.exports = routes;