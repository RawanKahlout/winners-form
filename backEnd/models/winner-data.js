const mongoose = require('mongoose');
const {Schema} = mongoose;
const winnersData = new Schema ({
submitionData : Date,
formData : JSON,
competitionName : String,
shortId : String
})
const winnerData = mongoose.model('winnerData', winnersData);
exports.winnerData = winnerData;
