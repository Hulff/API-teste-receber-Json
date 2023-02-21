const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sensordata = new Schema({
    bateria: {
        type: Number,
        require: true
    },
    temperatura: {
        type: Number,
        require: true
    },
    pressao: {
        type: Number,
        require: true
    },
      payload: {
        altitude: Number,
        co2:  Number,
        voc: Number
      }, 
    date: {
        type: Date,
        default: Date.now()
    },
    identificador: {
        type: Number,
        require:true
    }
})

mongoose.model("SensorData",sensordata)