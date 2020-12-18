var mongoose = require('mongoose');


var transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        minlength: 3
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        required: true
    }
});

mongoose.model('Transaction', transactionSchema);