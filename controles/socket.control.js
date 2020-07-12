;
'use strict'

const passport = require('passport')

    //const { ObjectId } = require('mongodb')

    
let gestionDocumentos = (http) => {
    let io = require('socket.io')(http)
    let socjetJwt = require('socketio-jwt')
    //IO usa jwt
    let session = getSessionId()
    console.log(session)
    io.use(socjetJwt.authorize({
        socjetJwt: process.env.KEY_JWT,
        handshake: true
    }))
    const gestionDatos = {}
    io.on('connection', socket => {
        let anteriorId
        console.log(socket.handshake.password)
        //registarme a una sala
        const safeJoin = actualId => {
            // salir de una sala 
            socket.leave(anteriorId)
            // unirme a una sala
            socket.join(actualId)
            anteriorId = actualId
        }
        //listar los diferntes documentos que se estan editando 
        socket.on('getDoc', docId => {
            safeJoin(docId)
            //'gestionDato' es el nombre con el que el cliente va a llamar al evento emit
            socket.emit('gestionDato', gestionDatos[docId])
        })
        //agerdar los docmuentos de las salas
        socket.on('addDoc', doc => {
            if (doc.psw === '1234') {
                let salas = Object.keys(gestionDatos)
                let numeroSalas = salas.length + 1
                let nombreSala = `documento ${numeroSalas}`
                doc.id = nombreSala
                gestionDatos[doc.id] = doc
                safeJoin(doc.id)
                gestionDatos[doc.id] = nombreSala
                io.emit('gestionDatos', Object.keys(gestionDatos))
                socket.emit('gestionDato', doc)
            }

        })
        //editar los documetnos de las salas
        socket.on('editDoc', doc => {
            gestionDatos[doc.id] = doc
            socket.to(doc.id).emit('gestionDato', doc)
        })
        io.emit('gestionDatos', Object.keys(gestionDatos))
    })
}

let getSessionId = (req, res) => {
    return '12345'
}
module.exports = gestionDocumentos