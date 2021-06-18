const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/health',{ useNewUrlParser: true}, (err)=>{
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB Connection : ' + err) }
});

require('./pharm.model');