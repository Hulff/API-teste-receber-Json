const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const data = new Schema({
    dado: Schema.Types.Mixed,
    data:{
        type: Date,
		default: Date.now
    }
})

mongoose.model("Data",data)