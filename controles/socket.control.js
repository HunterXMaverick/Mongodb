//const { ObjectId } = require('mongodb')
;
'use strict'

let gestionDocumentos = (http) => {
    let io = require('socket.io')(http)
    const gestionDatos = {}
    io.on('connection', socket => {
        let anteriorId
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
            socket.emit('gestionDato', gestionDatos[docId])
        })
        //agerdar los docmuentos de las salas
        socket.on('addDoc', doc => {
            safeJoin(doc.id)
            gestionDatos[doc.id] = doc
            io.emit('gestionDatos', Object.keys(gestionDatos))
            socket.emit('gestionDato', doc)
        })
        //editar los documetnos de las salas
        socket.on('editDoc', doc => {
            gestionDatos[doc.id] = doc
            socket.to(doc.id).emit('gestionDato', doc)
        })
        io.emit('gestionDatos', Object.keys(gestionDatos))
    })
}

module.exports = gestionDocumentos