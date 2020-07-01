;
'use strict'

const connectDb = require('../config/db'),
    fs = require('fs'),
    bcrypt = require('bcrypt')
const passport = require('passport')
const { RSA_NO_PADDING } = require('constants')
jwt = require('jsonwebtoken')


let prueba = (req, res) => {
    res.status(200).send('Zero')
}

let getUsuarios = async (req, res) => {
    let db = await connectDb()
    db.collection('usuarios').find().toArray()
        .then(data => {
            res.status(200).json({
                transaccion: true,
                data: data,
                msg: 'listo',
                token: req.token
            })
        }).catch(err => {
            res.status(500).json({
                transaccion: false,
                data: null,
                msg: err
            })
        })
}


//metodo Query
let postmanQuery = (req, res) => {
    let nombre = req.query.nombre
    let apellido = req.query.apellido
    let edad = req.query.edad
    let persona = req.query
    console.log(req.query)
    console.log(persona)
    let data = {
        nombre,
        apellido,
        edad
    }

    res.status(200).json({
        transaccion: true,
        data,
        msg: ''
    })
}

//metodo Params
let postmanParams = (req, res) => {
    let nombre = req.params.nombre
    let apellido = req.params.apellido
    let edad = req.params.edad
    let persona = req.params
    console.log(persona)
    let data = {
        nombre,
        apellido,
        edad
    }
    res.status(200).json({
        transaccion: true,
        data,
        msg: ''
    })
}

//metodo Body
let postmanBody = (req, res) => {

    let nombre = req.body.nombre
    let apellido = req.body.apellido
    let edad = req.body.edad
    let persona = req.body
    console.log(persona)
    let data = {
        nombre,
        apellido,
        edad
    }
    res.status(200).json({
        transaccion: true,
        data,
        msg: ''
    })
}

//buscar por id
let getUserByID = async (req, res) => {
    let db = await connectDb(),
        id = parseInt(req.params.id);
    db.collection("usuarios")
        .find({ id })
        .toArray()
        .then((data) => {
            res.status(200).json({
                ok: true,
                data: data,
                msg: "ok"
            })
        })
        .catch((err) => {
            res.status(500).json({
                ok: false,
                data: null,
                msg: "fallo"
            })
        })
}

//buscar por nombre
let getUserName = async (req, res) => {
    let db = await connectDb(),
        nombre = req.params.nombre
    db.collection("usuarios")
        .find({ nombre })
        .toArray()
        .then((data) => {
            res.status(200).json({
                ok: true,
                data: data,
                msg: "ok"
            })
        })
        .catch((err) => {
            res.status(500).json({
                ok: false,
                data: null,
                msg: "fallo"
            })
        })
}

//instar 1
let insertUser = async (req, res) => {
    let db = await connectDb(),
        data = req.body.data
    db.collection("usuarios")
        .insertOne({ data })
        .then((data) => {
            res.status(200).json({
                ok: true,
                data: data,
                msg: "ok"
            })
        })
        .catch((err) => {
            res.status(500).json({
                ok: false,
                data: null,
                msg: "fallo"
            })
        })
}

//instar varios
let insertVarios = async (req, res) => {
    let db = await connectDb(),
        data = req.body.data
    db.collection("usuarios")
        .insertMany(data)
        .then((data) => {
            res.status(200).json({
                ok: true,
                data: data,
                msg: "ok"
            })
        })
        .catch((err) => {
            res.status(500).json({
                ok: false,
                data: null,
                msg: "fallo"
            })
        })
}

//borrar
let borrarOne = async (req, res) => {
    let db = await connectDb(),
        id = parseInt(req.params.id);
    db.collection("usuarios")
        .deleteOne({ id })
        .then((data) => {
            res.status(200).json({
                ok: true,
                data: data,
                msg: "ok"
            })
        })
        .catch((err) => {
            res.status(500).json({
                ok: false,
                data: null,
                msg: "fallo"
            })
        })
}

//actualizar
let updateUser = async (req, res) => {
    let db = await connectDb(),
        id = parseInt(req.params.id),
        data = req.body.data
    db.collection("usuarios")
        .updateOne({ id }, { $set: data })
        .then((data) => {
            res.status(200).json({
                ok: true,
                data: data,
                msg: "ok"
            })
        })
        .catch((err) => {
            res.status(500).json({
                ok: false,
                data: null,
                msg: "fallo"
            })
        })
}

// modificar varios
let updateUsers = async (req, res) => {
    let db = await connectDb(),
        data = req.body.data

    data.forEach((element, x) => {
        let id = element.id

        db.collection("usuarios")
            .updateMany({ id }, { $set: element });
        if (x + 1 === data.length) {
            res.status(200).json({
                ok: true,
                data: data,
                msg: "corrido"
            })
        }
    })

}


let nuevoUsuario = async (req, res) => {
    let usuario = req.body.usuario
    let db = await connectDb()
    db.collection('usuarios').insertOne(usuario)
        .then(data => {
            res.status(200).json({
                transaccion: true,
                data,
                msg: 'usuario ok'
            })
        })
        .catch(err => {
            res.status(500).json({
                transaccion: false,
                data: null,
                msg: 'no se creo el usuario'
            })
        })
}


let loginUsuario = (req, res) => {
    let email = req.body.data.email
    let passw = req.body.data.passw
    // email obtenemos los datos del usuario
    let usuario = {
        nombre: "Zero",
        passw: "$2b$10$X3K0Wb7zgZfP6XZtRbqK5e9WPeZ4HUiAEQ6WpsuQ36xzm8cxBqGDa",
        crearteAt: "2020-07-01T07:51:27.909Z",
        sessionID: "kxceJUvH-pFKlzvaUg1EPMm_KVfXbjdq",
        _id: "5efc407fb55b773070756bb0"
    }
    let token = jwt.sign({ data: usuario }, process.env.KEY_JWT, {
        algorithm: 'HS256',
        expiresIn: 60 
    })
    console.log(token)
    res.status(200).json({
        passw: usuario.passw,
        token

    })
}

module.exports = {
    prueba,
    getUsuarios,
    postmanQuery,
    postmanParams,
    postmanBody,
    getUserByID,
    getUserName,
    insertUser,
    insertVarios,
    borrarOne,
    updateUser,
    updateUsers,
    nuevoUsuario,
    loginUsuario
}