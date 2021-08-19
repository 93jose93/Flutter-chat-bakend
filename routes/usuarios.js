/*
path: api/usuarios
http://localhost:3000/api/login/new

*/
//aqui se definira la rutas 
const { Router } = require('express');
const { getUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

//funcion
const router = Router();

//controlador renewToken
router.get('/',validarJWT, getUsuarios);



module.exports = router;