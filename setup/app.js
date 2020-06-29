;
'use strict'

const express = require('express'),
      bodyParser = require('body-parser'),
      connectDb =  require('../config/db')
      //passport = require('passport'),
      //cors = require('cors')


let app = express(),
    //session = require('express-session'),
    usuarioRuta = require('../rutas/usuarios.rutas'),
    fileRuta = require('../rutas/files.ruta')
    db = connectDb(),
    /*sess = {
        secret: process.env.KEY_SESSION,
        resave: false,
        saveUninitialized: true,
        name: 'sessionID',
        cookies: {
            httpOnly: false,
            maxAge: parseInt(process.env.TIEMPO)
        }
    },
    corsOptions ={
        origin: 'http://localhost:3500',
        optionsSuccessStatus: 200
    }
    

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

//Cors
app.use(cors(corsOptions))

//session
app.use(session(sess))

//pasport
app.use(passport.initialize())
app.use(passport.session)

//ejemplos de sesion para verificar
app.use((req,res)=>{
    if(!req.session.view){
        req.session.views= {}
    }
    let pathName = parseurl(req).pathName
    req.session.views(pathName) = (req.session.views[pathName]|| 0) + 1
    next()
})

app.get('/prueba1', (req, res) => {
  //  res.send('Las visitas de esa pagina son: ${req.session.views['/prueba1']}')
})*/

app.use('/api', usuarioRuta)
app.use('/api', fileRuta)

module.exports = app