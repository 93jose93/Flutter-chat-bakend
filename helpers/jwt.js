//se usa una libreria que ya se habia importado
const jwt = require('jsonwebtoken');


//recivimos el id del usario
const generarJWT = ( uid ) => {
 
 //esto es una promesa y lo que hace es para que este paso no lo salte, y si da un error se detenga
 //reject es el error
 //resolve es el token generado para poder enviarle donde se llame
 return new Promise( (resolve, reject) => {
       

        //existe 3 partes en el token, header, payload, verificar signature o firma
        //payload se puede guardar informacion del usuario, pero esta que no se sencible, como trajeta de credito, en este caso solo guardaremos el id, aparte payload trae fecha y la duracion
        //verificar o firma, verifica que si payload a sido cambiado, entonces no va a continuar y no podran usar este token, y la firma tiene un incriptacion diferente
        const payload = { uid };

        //para firmarlo
        //existe una clave unica que el usario PROGRAMADOR O ADMINISTRADOR genera para firmar los tokens 
        //esto tiene que ser unico si otro usario sabe de esta firma, podra frimar tokens de nuestro servidor 
        jwt.sign( payload, process.env.JWT_KEY, {
            //esto es para darle mayor seguridad y darle expiracion al token que creamos como administrador
            
            expiresIn: '24h'
            //si este token expira se le cerrara la session, y al hacer login generara uno nuevo
            //si este token cumple esta hora, creamos una nueva ruta donde renovamos un nuevo token para este usuario
        }, ( err, token ) => {
            
            if(err) {
                //no se pudo crear el token
                reject('No se pudo generar el JWT');
            } else {
                //aqui tenemos el TOKEN! generado
                resolve(token);
            }
        });
 });

}

//funcion para validar token, pero cuando el usaurio ya lo posee el token y el servidor verifique
const comprobarJWT = ( token = '') => {

     //ahora validar si el token existe
     try {
        //aqui biene el token y aqui validaremos 
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
      
        //regresamos esto si el usario esta iniciado
        //true diciendo que se conecto
        return [true, uid];



        next();
    } catch (error) {
        return [false, null]
    }

}


module.exports = {
    generarJWT,
    comprobarJWT
}