//importar el paquete
const mongoose = require('mongoose');

const dbConnection = async() => {

    //se usa try catch para poder controllar los errores

    try {
      //promesa por eso se le agrega await
        await mongoose.connect(process.env.DB_CNN, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        });
     
        console.log('DB Online');
      } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el admin');
    }
}

//hay que exportarlo manualmente, por nombre
module.exports = {
    dbConnection,
}