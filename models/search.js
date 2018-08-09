/**
 * Created by lofms on 2018-04-10.
 */
let mongoose = require('mongoose');


//Shearches schema
let searchSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
    });

let Search = module.exports = mongoose.model('Search',searchSchema);