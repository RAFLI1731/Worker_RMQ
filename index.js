const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 1997
const bodyParser = require('body-parser')
const { router: routerWorker } =  require('./Controller/app')

    app.use(cors())
    app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
    }))
    app.use(bodyParser.urlencoded({
    extended:true,
    limit: '50mb'
    }))
    app.use(express.static('static'))
    app.use('worker', routerWorker)
    // app.use('/user', require('./Routes/User'))
    // app.use('/adc', require('./Routes/data'))
    // app.use('/movie', require('./Routes/Movie'))
    app.listen(port, function(){
        console.log('Server Berjalan diport ' + port)
    })
// function ambil(nama) {
//     console.log('Berhasil Data Rendering', nama)
// }
// ambil('Rafli')
