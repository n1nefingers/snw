/**
 * Created by lofms on 2018-04-11.
 */


/**
 * Created by lofms on 2018-04-10.
 */
let mongoose = require('mongoose');


//Shearches schema
let articleShema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    param:{
        type: Array,
        required: true
    },
    operator:{
        type: Array,
        required: true
    },
    andOr:{
        type: Array,
        required: false
    }

});

let Article = module.exports = mongoose.model('Article',articleShema);