const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

//interaciones con la base de datos para, cambiar el estado en oonline en true, o falso, ya que se conecta pero en mongo db no cambiamos el estado
//esto se hace pára mostrar, segun cuando este conectado en el diseño en verde y rojo cuando no
const usuarioConectado = async ( uid = '' ) => {
   
    //informacion  del usaurio
   const usuario  = await Usuario.findById( uid );
   usuario.online = true;

   //grabar en base de datos
   await usuario.save();

   return usuario;

}

const usuarioDesconectado = async ( uid = '' ) => {
   
    //informacion  del usaurio
   const usuario  = await Usuario.findById( uid );
   usuario.online = false;

   //grabar en base de datos
   await usuario.save();

   return usuario;

}

const grabarMensaje = async( payload ) => {

    /**
        payload {
            de: '',
            para: '',
            texto: ''
        }
     */

   try {
     const mensaje = new Mensaje( payload )
     await mensaje.save();
        
    return true;
   } catch (error) {
       return false;
   }

}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}