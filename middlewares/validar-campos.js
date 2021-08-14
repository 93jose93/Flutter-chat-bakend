//next se refiere a que sin todo esta bien continue conn el siguiente middleware

const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {

     //libreria importada de validaciones 
    const errores = validationResult(req);
    //aqui preguntamos, que si falta un campo realice esto
    if(!errores.isEmpty()) {
        return res.status(400).json({
            ok:false,
            errors: errores.mapped(),
        });
    }

    next();
}

module.exports = {
    validarCampos
}