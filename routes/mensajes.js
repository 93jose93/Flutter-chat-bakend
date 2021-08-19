/*
   Path: /api/mensajes
   
*/

const { Router } = require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');

//funcion
const router = Router();

//controlador renewToken
router.get('/:de',validarJWT, obtenerChat);



module.exports = router;