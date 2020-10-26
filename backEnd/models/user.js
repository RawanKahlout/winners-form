const mongoose = require('mongoose');
const User = new mongoose.Schema({
    Username: String ,
    email : {
       type:String,
       unique:true 
    },
    Loggedin: {
      type:Boolean,
      default:false
    },
    password: String ,
  });

const userAcc = mongoose.model('userAcc', User);
exports.userAcc = userAcc;