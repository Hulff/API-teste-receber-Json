const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const data = new Schema({
    dado: {
        type:Object
    },
    data:{
        type: Date,
		default: Date.now
    }
})

mongoose.model("Data",data)