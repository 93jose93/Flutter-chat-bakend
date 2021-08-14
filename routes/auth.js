/*
path: api/login
http://localhost:3000/api/login/new

*/
//aqui se definira la rutas 
const { Router } = require('express');
const { check } = require('express-validator');



//aqui se importo el contralador 
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//funcion
const router = Router();


//ruta para crear usaurio
//un post crearUsuario es el controlador
//se le agregara midelwares para validar infromacion
router.post('/new',[
    //verifica campo por campo
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'La correo es obligatorio').isEmail(),
    //el siguiente es el middleware que se personalizo para validar
    validarCampos

],crearUsuario);

//nueva ruta, par hacer login
router.post('/',[
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'La correo es obligatorio').isEmail(),
    validarCampos
],login);


//nueva ruta con get, para renovar el token
//validarJWT
router.get('/renew',validarJWT, renewToken);



module.exports = router;