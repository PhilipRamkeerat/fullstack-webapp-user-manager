const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set collection and schema
let User = new Schema({
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    userCPF: {
        type: String
    },
    userPhone: {
        type: String
    }
}, {
    collection: 'User'
});

module.exports = mongoose.model('User', User);

