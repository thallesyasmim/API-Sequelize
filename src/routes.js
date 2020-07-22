const express = require('express');
const { store, index } = require('./controllers/UserController');
const { storeAddress, indexAddress } = require('./controllers/AddressController');
const { indexTechs, storeTechs, destroyTechs } = require('./controllers/TechController');
const { showReport } = require('./controllers/ReportController');


const routes = express.Router();

routes.get('/users', index);
routes.post('/users', store)

routes.get('/users/:user_id/address', indexAddress);
routes.post('/users/:user_id/address', storeAddress);

routes.get('/users/:user_id/techs', indexTechs);
routes.post('/users/:user_id/techs', storeTechs);
routes.delete('/users/:user_id/techs', destroyTechs);

routes.get('/report', showReport);

module.exports = routes;