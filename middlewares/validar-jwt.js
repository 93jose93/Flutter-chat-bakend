const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    //leer el token, lo que hacemos es recibir el token aqui que se genero
    const token = req.header('x-token');
    //console.log(token);

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    //ahora validar si el token existe
    try {
        //aqui biene el token y aqui validaremos 
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        //esto es para tener el id del usuario
        req.uid = uid;



        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }



    

}

module.exports = {
    validarJWT
}