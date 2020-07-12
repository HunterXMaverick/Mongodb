;
'use strict'

const express = require('express'),
    bodyParser = require('body-parser'),
    connectDb = require('../config/db'),
    passport = require('passport'),
    cors = require('cors'),
    parseurl = require('parseurl')


let app = express(),
    session = require('express-session'),
    usuarioRuta = require('../rutas/usuarios.rutas'),
    fileRuta = require('../rutas/files.ruta')
db = connectDb(),
    sess = {
        secret: 'hola',
        resave: false,
        saveUninitialized: true,
        name: 'sessionID',
        cookies: {
            httpOnly: false,
            maxAge: parseInt(process.env.TIEMPO)
        }
    },
    corsOptions = {
        //origin: 'http://localhost:3500',
        origin: 'http://localhost:4200',
        optionsSuccessStatus: 200
    }


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//Cors
app.use(cors(corsOptions))

//Session
app.use(session(sess))

//Pasport
app.use(passport.initialize())
app.use(passport.session())

//Ejemplos de sesion para verificar
app.use( (req, res, next) => {
    if (!req.session.views) {
        req.session.views = {}
    }

    //Get the url pathname
    var pathname = parseurl(req).pathname

    //Count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

    next()

})
// si no funciona colclarr enonbre de funcion 
app.get('/foo', (req, res, next) => {
    res.send('vista foo' + req.session.views['/foo'] + 'time')
})

app.get('/prueba1',  (req, res, next) => {
    res.send('vista prueba1' + req.session.views['/prueba1'] + 'time' + req.sessionID)
})


app.use('/api', usuarioRuta)
app.use('/api', fileRuta)

module.exports = app