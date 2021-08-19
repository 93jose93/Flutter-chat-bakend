//importamos la libreria io
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');


//mensaje de sockets
io.on('connection',  client => {
    console.log('Cliente conectado');

    //cliente con websokets
    //haremos que el cliente se valla a conectar su token, lo reconoscamos pór el servidor y lo validemos
    //aqui en este console ya podemos leer el token de usario 
    //console.log( client.handshake.headers );
    //console.log( client.handshake.headers['x-token'] );
    
    //funcion para validar token, pero cuando el usaurio ya lo posee el token y el servidor verifique
    const [valido, uid]  = comprobarJWT(client.handshake.headers['x-token']);

   // console.log(valido, uid);
    //hacemos una comrpobacion de si en cliente no esta autenticado con token lo desconecte 
    if( !valido ) { 
       return client.disconnect(); 
    }

    console.log('Cliente autenticado');
    
    //aqui mandamos cuando el ciente se conecte que en base de datos cambie a true 
    usuarioConectado( uid );


    //necesito ingresar al usario a una sala 
    //sala global
    //o a raves del clien.id 

    //unimos mi id a la sala y luego podemos escribir al usario de interes
    client.join( uid );
    

    //escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async ( payload ) => {
        //aqui recibimos los mensajes
        //console.log(payload);
        
        //solo emitimos cuando se guarde en base de datos
        await grabarMensaje(payload);

        //aqui le enviamos el mensaje a esa persona
        //pero aqui reflejamos ese mismo mensaje enviado
        //este mensaje lo envia desde servidor al dispositivo
        io.to(payload.para).emit('mensaje-personal', payload);
    });




    
    client.on('disconnect', () => {
         
        //aqui usamos esta funcion, para cuando el cliente se desconecte, cambie en la base de datos en false, como cliente no conectado
         usuarioDesconectado( uid );
         console.log('Cliente desconectado');

    });
 






    
    //mensaje enviado del html y aqui lo recive 
    //payload es el argumento del nombre enviado en html

    /*
    client.on('mensaje', ( payload )=> {
       console.log('Mensaje!!', payload);
       
 
       //aqui es lo que responde el servidor a todos los usarios coentacods por io.emit
       
       io.emit( 'mensaje', {admin: 'Nuevo mensaje'} );
    });

    */
  });
 