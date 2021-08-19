const express = require('express');
const path = require('path');
require('dotenv').config();

//base datos configuracion
require('./database/config').dbConnection();

//App de Express
const app = express();


//lectura del body en una petiocn http, esto tambien son Midelwores, una funcion que se ejecuta cunado pasa por hay
app.use(express.json());

//Node Server soket
const server = require('http').createServer(app);
//informacion que llega y sale
module.exports.io = require('socket.io')(server);
//respuesta del servidor
require('./sockest/socket');



//path publico
//__dirname apunta que al dominio o al localhost
//public es la carpeta con el html
const publicPath = path.resolve( __dirname, 'public' )
app.use( express.static(publicPath));


//definir las rutas, como laravel mon mildelware
app.use( '/api/login', require('./routes/auth'));

app.use( '/api/usuarios', require('./routes/usuarios'));

app.use( '/api/mensajes', require('./routes/mensajes'));





//toma la conexion de node server soket
server.listen( process.env.PORT, ( err ) => {

   if(err) throw new Error(err);

   console.log('Servidor corriendo en puerto', process.env.PORT);

});