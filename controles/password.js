;
'use strict'

const bcrypt = require('bcrypt')

let codificarPassword = (req, res, next) => {
    let usuario = req.body.usuario || null
    if (!usuario || usuario.passw == '' || !usuario.passw) {
        console.log('usuario no valido')
        return res.status(200).send('usuario o password invaldios')
    } else {
        let codificarPassword = bcrypt.hashSync(usuario.passw, bcrypt.genSaltSync(10))
        if (codificarPassword) {
            req.body.usuario.passw = codificarPassword
            req.body.usuario.crearteAt = new Date() //otro dato que se puede validar
            if (req.sessionID) {
                req.body.usuario.sessionID = req.sessionID
                next()
            } else {
                return res.status(200).send('no se encontro una sesion valida')
            }
        } else {
            return res.status(200).send('el password no se proceso')
        }
    }
}

module.exports = {
    codificarPassword
}