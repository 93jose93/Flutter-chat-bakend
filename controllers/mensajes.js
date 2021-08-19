const Mensaje = require('../models/mensaje');


const obtenerChat = async(req, res) => {
     
    //este es mi id 
    const miId = req.uid;
    //mensajes de interes
    //(de) es el argumentos que agregamos en routes mensaje
    const mensajesDe = req.params.de;

    //cargar los ultimos 30 mensajes
    const last30 = await Mensaje.find({
        //concatene los id, para hacer un condicion
        $or: [{ de: miId, para: mensajesDe}, {de: mensajesDe, para: miId}]
    }).sort({ 
        //este campo es de mongo db de la fecha
        createdAt: 'desc'
    }).limit(30);

    res.json({
          ok: true,
          //msg: 'hola mensajes',
          //miId,
          //mensajesDe
          mensajes: last30
    });

}


module.exports = {
    obtenerChat
}