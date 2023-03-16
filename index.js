const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT||8081
 
app.options('*', cors()) // include before other routes
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
app.get("/getdata/:ind", (req,res)=>{
    let inds = parseFloat(req.params.ind)
    sensordatas.find({identificador:inds}).sort({_id:-1}).limit(1).then((data) => {
        res.send(data)
    })
})
app.get("/getHistory/:ind/:dia", (req,res)=>{
    let inds = parseFloat(req.params.ind)
    let day = parseFloat(req.params.dia)
    sensordatas.find({identificador:inds,"horario.dia":day}).sort({"horario.hora":-1,"horario.min":-1}).then((data) => {
        res.send(data)
    }).catch((err)=>{
        res.send("no data")
    })
})

app.post("/json/:bateria/:ind/:temp/:pressao/:voc/:co2/:umidade/:altitude",(req,res)=>{
    console.log(req.params.bateria)
    console.log(req.params.temp)
    console.log(req.params.pressao)
    console.log(req.params.voc)
    console.log(req.params.co2)
    console.log(req.params.ind)
    console.log(req.body)

    const novoDado = {
        bateria: req.params.bateria,
        temperatura: req.params.temp,
        pressao: req.params.pressao,
        payload: {
            altitude: req.params.altitude,
            co2: req.params.co2,
            voc:req.params.voc
        },
        identificador:req.params.ind,
        umidade:req.params.umidade,
        horario:{
            dia:parseInt(new Date().getDate()),
            mes:parseInt(new Date().getMonth()),
            hora:parseInt((new Date().getHours())-3),
            min:parseInt(new Date().getMinutes())
        }
    }
    console.log(novoDado)
    new sensordatas(novoDado).save().then(() => {
        res.send("sucesso "+"salvo as "+parseInt((new Date().getHours())-3)+" horas e "+parseInt(new Date().getMinutes())+" minutos")
    }).catch((err)=>{
        res.send("erro"+err)
    })
})


app.listen(PORT,()=>{
    console.log("on")
})
