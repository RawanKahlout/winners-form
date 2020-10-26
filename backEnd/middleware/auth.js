const jwt = require('jsonwebtoken');
const { userAcc } = require('../models/user');
require('dotenv/config');
module.exports = async function (req, res, next) {
  //var token = req.header('authToken');
  token = req.query.token;
  //token =authToken;
  
  if (!token || token == null)
    return res.status(401).send('Access denied ,No token provided');
  else {
    try {
      const decoded = jwt.verify(token, process.env.JWTKEY);
      let data;
      req.data = decoded._id
      const isLoggedIn = (await userAcc.findOne({ "_id": decoded._id })).Loggedin
      if (isLoggedIn)
        next();
      else
        res.status(501).send("not logged in").end();
    }
    catch (ex) {
      res.status(400).send('invalid').end();
    }//wrong data
  }

}
