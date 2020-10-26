const mongoose = require('mongoose');
const {Schema} = mongoose;
const formstemplates = new Schema({
    banner: String,
    competionName: {
        type: String,
        require: true
    },
    shortId: {
        type: String
    },
    extraField: JSON
})

const formTemplate = mongoose.model('formTemplate', formstemplates);

exports.formTemplate = formTemplate;