;
'use strict'

const bcrypt = require('bcrypt')

let codificarPassword = (req, res, next) => {
    let usuario = req.body.usuario || null
    if(!usuario || usuario.passw == '' || !usuario.passw){
        console.log('usuario no valido')
        res.status(200).send('usuario o cotrasena invaldios')
    }else{
        let codificarPassword = bcrypt.hashSync(usuario.passw, bcrypt.genSaltSync(10))
        req.body.usuario.passw = codificarPassword
        req.body.usuario.crearteAt = new Date() //otro dato que s epuede vailidar
        next()
    }
}

module.exports = codificarPassword