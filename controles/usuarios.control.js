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
                msg: 'listo'
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
            msg: 'guardado nuevo usuario'
        })
    })
    .catch(err =>{
        res.status(500).json({
            transaccion: false,
            data: null,
            msg: 'usuario nuevo no guardado'
        })
    })



    if (!usuario.passw || usuario.passw == '') {
        res.status(200).send('usuario o password invalido')
    } else {
        let passwordEncriptado = bcrypt.hashSync(usuario.passw, bcrypt.genSaltSync(10))
        console.log(usuario.passw)
        console.log(passwordEncriptado)
        // res.status(200).send(passwordEncriptado) si se deja ese status ya no procesa el if creado

        usuario.passw = passwordEncriptado
        usuario.sessionID = req.sessionID

        //alamncear en la db
              /*let token = jwt.sign({ data: usuario }, process.env.KEY_JWT, {
            algorithm: 'HS256',
            expiresIn: parseInt(process.env.TIEMPO)
        })
        console.log(token)*/

        res.status(200).json({
            passw: usuario.passw,
            //devolver la infomracion
            //token
        })

        //token = jwt.sing({data: usuario}, req.sessionID) la calve sera un contrasea difieretne por cada usuario            
    }
}


let loginUsuario = (req, res) => {
    let email = req.body.data.email
    let password = req.body.data.password
    let token = jwt.sign({ data: usuario }, process.env.KEY_JWT, {
        algorithm: 'HS256',
        expiresIn: parseInt(process.env.TIEMPO)
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