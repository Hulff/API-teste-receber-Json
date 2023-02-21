const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT||8080

// models
require('./models/data')
const Data = mongoose.model("Data")
require('./models/SensorData.js')
const sensordatas = mongoose.model("SensorData")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//mongoose
mongoose.Promise = global.Promise
mongoose.connect("mongodb+srv://hugo:96762171@blogapp.m1mhh.mongodb.net/SensorTest?retryWrites=true&w=majority").then(() => {
    console.log('Conectado a database no mongodb')
}).catch((err) => {
    console.log(err)      
})

app.get("/",(req,res)=>{
    res.send("home")
})

app.post("/json/:bateria",(req,res)=>{
    console.log(req.params.bateria)
    console.log(req.body)
    let novoDado = {
        dado:1
    }
    novoDado.dado = req.body
    new Data(novoDado).save().then(() => {
        res.send("sucesso")
    }).catch((err)=>{
        res.send("erro"+err)
    })
})
app.post('/saveData/:identificador/:bateria/:temp/:pressao/:voc/:co2', (req, res) => {
    console.log(req.body)
    
    let identificador = req.params.identificador
    let bateria = req.params.bateria
    let temperatura = req.params.temp
    let pressao = req.params.pressao
    let payload = {
        altitude: (44331.5-(4946.62*(pressao**0.190263))),
        co2: req.params.co2,
        voc: req.params.voc
    }
    console.log(identificador)
    
    const novoDado = {
        bateria: bateria,
        temperatura: temperatura,
        pressao: pressao,
        payload: {
            altitude: payload.altitude,
            co2: payload.co2,
            voc: payload.voc
        },
        identificador:identificador
    }

    new sensordatas(novoDado).save().then(() => {
        res.send('back');
    })
})


app.listen(PORT,()=>{
    console.log("on")
})