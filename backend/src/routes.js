const express = require('express');
const routes = express.Router();

const sociosController = require('./controllers/sociosController');
const agendamentoController = require('./controllers/agendamentoController');
const eventosController = require('./controllers/eventosController');
const pdfController = require('./controllers/pdfController');

routes.post('/socios', sociosController.create);
routes.post('/agendamento', agendamentoController.create);
routes.post('/eventos', eventosController.create);
routes.post('/pdf',pdfController.create);

routes.get('/socios', sociosController.index);
routes.get('/socios/:id', sociosController.index);
routes.get('/agendamento', agendamentoController.index);
routes.get('/agendamento/:id', agendamentoController.index);
routes.get('/eventos', eventosController.index);

routes.delete('/socios/:id', sociosController.delete);
routes.delete('/agendamento/:id', agendamentoController.delete);

routes.put('/socios', sociosController.update);
routes.put('/agendamento', agendamentoController.update);


module.exports = routes;