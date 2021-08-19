const { Schema, model } = require('mongoose');

//esto es lo que se guarda en la base de datos
const MensajeSchema = Schema({
    
    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        require: true
    }
    
    
}, {
    //poner fecha que biene por defecto de mongo db
    timestamps: true
});

//aqui sobreescribiremos un metodo para que solo nos devuelva lo que necesitamos, como solo id y usuario
MensajeSchema.method('toJSON', function() {
   
    const { __v, _id, ...object } = this.toObject();
    return object;
});

//mongo por defecto en base de datos le agrega el plural de Mensajes con la s al final
module.exports = model('Mensaje', MensajeSchema );