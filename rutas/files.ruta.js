;
'use strict'

const express = require('express'),
    multiParty = require('connect-multiparty')

let api = express.Router(),
    filesControl = require('../controles/files.control'),
    galeriaMiddeleware = multiParty({uploadDir: './files/galeria'}),
    pdfMidelware = multiParty({uploadDir: './files/pdf'})



//ENDPOINT de usuarios
api.post('/upload_galeria', galeriaMiddeleware, filesControl.uploadFile)
api.post('/upload_file', galeriaMiddeleware, filesControl.uploadFile)
api.get('/file_galeria/:urlFile', filesControl.verFileGaleria) //se recomienda mandar dos datos el nombre del archivo y el irectorio que se quiere gaurdar


//api.delete('/file_borrar/:file', filesControl.deleteFileGaleria)


module.exports = api