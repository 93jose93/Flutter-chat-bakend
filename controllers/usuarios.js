const { response } = require('express');
const Usuario = require('../models/usuario');


const getUsuarios = async( req, res = response ) => {
    
    //paginacion
    const desde = Number( req.query.desde ) || 0;

    //obtenemos el listado de usaurio
    const usuarios = await Usuario
      //podemos poner condiciones y filtros, como ejemplo que el usuario conectado no aparesca en esta lista
       .find({ _id: { $ne: req.uid } })
      //.sort para que aparesca los conectados primero
       .sort('-online')
       //paginacion
       .skip(desde)
       //limite de paginacion, muestra ejemplo 20 usuarios, los cambie que muestre 100 usuarios
       .limit(100)


    //respuesta en json cuando se llama a la api desde la url
    res.json({
        ok: true,
        // msg: 'GetUsarios'
        usuarios,
        desde

    });

}

module.exports = {
    getUsuarios
}