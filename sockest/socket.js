//importamos la libreria io
const { io } = require('../index');


//mensaje de sockets
io.on('connection', client => {
    console.log('Clinte conectado');
    
    client.on('disconnect', () => { 
         console.log('Clinete desconectado');
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
 