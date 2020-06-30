;
'use strict'

const express = require('express')

let api = express.Router(),
    usuarioControl = require('../controles/usuarios.control')



    //ENDPOINT de usuarios
api.get('/prueba', usuarioControl.prueba)
api.get('/get_usuarios', usuarioControl.getUsuarios)


api.get('/postman_query', usuarioControl.postmanQuery)
api.get('/postman_params/:nombre/:apellido/:edad', usuarioControl.postmanParams)
api.post('/postman_body', usuarioControl.postmanBody)

api.get('/usuario_id/:id', usuarioControl.getUserByID)
api.get('/usuario_nombre/:nombre', usuarioControl.getUserName)
api.post('/usuario_agregar', usuarioControl.insertUser)
api.post('/usuario_varios', usuarioControl.insertVarios)
api.delete('/usuario_borrar/:id', usuarioControl.borrarOne)
api.put('/usuario_actual/:id', usuarioControl.updateUser)
api.put('/usuario_actuales', usuarioControl.updateUsers)


api.post('/nuevo_usuario', usuarioControl.nuevoUsuario)

module.exports = api