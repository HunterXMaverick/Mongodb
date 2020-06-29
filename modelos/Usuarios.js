;
'use strict'

const mongoose = require('mongoose'),
      { Schema } = mongoose,

      UsuarioModel = new Schema(
          {
              nombre: {type: String},
              apellido: {type: String},
              edad: {type: String},
              img: {type: String}
          }
      );