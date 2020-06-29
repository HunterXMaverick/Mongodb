;
'use strict'

const env = require('dotenv').config(),
      app = require('./app'),
      port = process.env.PORT || 3000
      
console.log(process.env)

app.listen(port, (err) => {
    if (!err){
        console.log(`El servicio esta funcionando en el puerto http://localhost:${port}`)
    }else {
        console.log('El sevicio no esta funcionando')
    }
})