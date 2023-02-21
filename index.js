const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT||8080

// models
require('./models/data')
const Data = mongoose.model("Data")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//mongoose
mongoose.Promise = global.Promise
mongoose.connect("mongodb+srv://hugo:96762171@blogapp.m1mhh.mongodb.net/APIteste?retryWrites=true&w=majority").then(() => {
    console.log('Conectado a database no mongodb')
}).catch((err) => {
    console.log(err)      
})

app.get("/",(req,res)=>{
    res.send("home")
})

app.post("/json",(req,res)=>{
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


app.listen(PORT,()=>{
    console.log("on")
})