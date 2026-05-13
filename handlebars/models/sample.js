const mongoose = require('mongoose');

/* 
 * This provides a pretty simple template 
 * for creating models. Use proper naming
 * conventions for actual models tho.
 *
 * */

const Sample = new mongoose.Schema({
    // obtain the fields below from the google
    // account if we can.
    refField: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    stringField: {
        type: String,
        required: true,
        unique: true,
    },
    arrayString: {
        type: [String],
        required: true,
    },
});

// IMPORTANT TODO: Change the model name here
module.exports = mongoose.model('Sample', Sample);

