const { Schema, model } = require('mongoose');

//como luce este modelo
//esto es para guardar en la base de datos
const UsuarioSchema = Schema({
    
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        //correo unico guardar en base datos
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false      
    },
});

//aqui sobreescribiremos un metodo para que solo nos devuelva lo que necesitamos, como solo id y usuario
UsuarioSchema.method('toJSON', function() {
   //aqui extraemos
   //toObject trae toda la respuesta y entonces modficaremos que queremos
   //...object  aqui esta almacenado el resto de lo que no necesitamos
    const { __v, _id, password, ...object } = this.toObject();
    //aqui renombramos una de esas propiedades, que es el id que me retorna de la base de datos
    object.uid = _id;
    return object;
});

//exportar, para que s epueda usar
module.exports = model('Usuario', UsuarioSchema );