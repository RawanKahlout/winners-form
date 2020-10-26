var multer = require('multer');
var path = require('path');
var fs = require('fs');
module.exports = function (req, res, next) {
    try {
        next();
    }
    catch (err) {
     
        return res.status(501).json({ error: err });
    }
}