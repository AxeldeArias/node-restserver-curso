const mongoose = require('mongoose');
require('./config/config')
const express = require('express')
const app = express()


const bodyParser = require('body-parser')

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())



mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err)
        throw err
    console.log('base de datos ONLINE');
});

app.use(require('./routes/usuario'))

app.listen(process.env.PORT, () => console.log('Escuchando puerto,3000'))