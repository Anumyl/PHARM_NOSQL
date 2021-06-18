const mongoose = require('mongoose');

var pharmSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: 'Pharmacy Name field is required.'
    },
    mname: {
        type: String,
        required: 'Medicine name is required.'
    },
    stock: {
        type: Number,
        required: 'Stock is required.'
    },
    cost: {
        type: Number,
        required: 'Cost is required.'
    },
    mobile: {
        type: String,
        required: 'Mobile Number is required.'
    },
    city: {
        type: String,
        required: 'City is required.'
    },
});

mongoose.model('Medicine', pharmSchema);