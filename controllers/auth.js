const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');



//controlador para crear usuario
const crearUsuario = async (req, res = response) =>{

    //quiero extrer el email, y el password, esto se hace pára poder usarlos,
    // y modificar algunas de sus propiedades, apara que den una respuesta diferente
    const { email, password } = req.body;
    //confirmar que existe en la base datos
    try {
        //aqui le decimos al servidor que ya existe ese correo
        //aqui busca en la base de datos, el cual se agrega el modelo, findOne busca uno 
        const existeEmail = await Usuario.findOne({ email });
        //entonces si busca y existe ese correo responde
        if( existeEmail ){
            //al poner return ya no se ejecuta lo que esta abajo
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }


        //traeremos el modelo usuario para guardar en la base datos
        // el req trae la informacion que se encia desde postamn o flutter
        //esto es una nueva instancia
        const usuario = new Usuario( req.body );
        
        //enciptar contraseña, ya que aqui biene solo numeros
        //usaremos una libreria instalado en node
        //salt lo que tiene es algo aleotorio
        const salt = bcrypt.genSaltSync();
        //lo agregamos al password
        usuario.password = bcrypt.hashSync( password, salt );

        //para grabar en base datos
        await usuario.save();


        //Generar el web token JWT
        //await se usa es para esperar que se realice esto primero para poder seguir
        const token = await generarJWT( usuario.id );
            
        //respuesta de guardado
        res.json({
                ok: true,
                //imprime lo que se guardo en base de datos
                usuario,
                //al tener token podria copiarlo y agregalo aqui https://jwt.io/ viendo lo que el token generado y lo que esta usando
                //con este token sera el acceso que se la dara al usario,
                // para almacenarlo en el cel, como metodo de autenticacion de nuestro servicios, y por medio de comuncacion por sokets
                token
                //aqui la respuesta de lo que se envio al guardar, mostrando el mismo objeto
                //msg: req.body        
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'error hable con el administrador'
        });
    }  
}


//nuevo controlador para hacer login
const login = async(req, res = response) => {

        //necesitamos email y passwod
        const { email, password} = req.body;
        //para la comicacion con la base datos
        try {
           //verificamos email
           const usuarioDB = await Usuario.findOne({ email });
           if( !usuarioDB ) {
                //error 404 es que no se encontro
                return res.status(404).json({
                   ok: false,
                   msg: 'Email no encontrado'
                });
           }

           //validar pasword
           const validPasword = bcrypt.compareSync( password, usuarioDB.password );
           if( !validPasword ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'La contraseña no es valido'
                });
           }

           //como esta todo bien se genera el webtoken
           const token = await generarJWT(usuarioDB.id);
           
           //al ver todo esta bien entonces responde usuario login exitoso
           res.json({
            ok: true,        
            usuario: usuarioDB,
            token      
           });


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error hable con el administrador'
            }); 
        }     
}

const renewToken = async(req, res = response) => {
   
   const uid = req.uid;

   //generar un nuevo JWT, 
   const token = await generarJWT( uid );

   //obtener el usaurio
   const usuario = await Usuario.findById( uid );


   
   
    res.json({
          ok: true,
          usuario,
          token 
          //uid: req.uid
    });
}


module.exports = {
    crearUsuario,
    login,
    renewToken
}