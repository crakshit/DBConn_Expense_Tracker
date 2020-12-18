var mongoose = require('mongoose');


var categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    }
});

mongoose.model('Category', categorySchema);