const mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String
    },
    mobile: {
        type: Number
    },
    verified: {
        type: String
    },
})
module.exports=mongoose.model('User',userSchema);