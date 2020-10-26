const { formTemplate } = require('../models/form-template');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
require('dotenv/config');//npm install dotenv
const uploadBanner = require('../middleware/uploadBanners');
const shortObjectId = require('short-objectid'); // you can  also use destucture way .. 

module.exports = (app) => {

    var store = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/banners');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    var upload = multer({ storage: store });
    //Post Teamplate
    app.post('/api/postTemplate', upload.single('file'), function (req, res) {
        return res.status(200);
    });
    //post dataTemplate
    app.post('/api/postDataTemplates', (req, res) => {
        new formTemplate({
            banner: req.body.fileName,
            competionName: req.body.competition,
            extraField: req.body.dynamicFeilds,
        }).save().then((result) => {
           
            return res.json(result).status(200);
        })
    })
    //set templateID
    app.put('/api/setTemplateID',async(req,res)=>
    {
        let stringID = req.body.templateId.toString();
        let MongoDB_ObjectID = { "$oid" : stringID }; 
        let shrinked = shortObjectId(MongoDB_ObjectID);
        const info = await formTemplate.updateOne({ '_id': req.body.templateId },
        { $set: { shortId : shrinked }})
        if (info) {
        return res.json(shrinked).status(200);
        }else { return res.status(501).send("somethingWrong")}

    })

    //Get Template 
    app.get('/api/getTemplate/:shrinked', async (req, res) => {
        var params = req.params.shrinked;
    
        const qResult = await formTemplate.findOne({ shortId : params });
        if (!qResult) {
            return res.status(404).send("its not exist");
        }
        else {
            return res.json(qResult).status(200);
        }
    });
    //Get Banner
    app.get('/api/bannerlink/:id', async(req,res)=>{
        var params = req.params.id ;
       
        const qResult = await formTemplate.findOne({ shortId: params });
      
        if(!qResult){ return res.status(404).send("somethingWrong")}
        else{  res.json(process.env.BannerLink+"static/banners/" + qResult.banner).status(200);}
    })
    app.get('/api/allTemplates',async(req,res)=>{
        const rResult = await formTemplate.find();
        if (rResult){ res.json(rResult).status(200); }
        else res.status(404).send("no data");
    })
    app.delete('/api/deleteTemplate', async(req,res)=>{
        console.log("here iam");
        const resutl= await formTemplate.findOneAndRemove({shortId: req.body.shortId});
        console.log(resutl);
        if(!resutl) return res.status(400).send('not found');
        res.status(200).send("Deleted !");
    })
       //Delete All templets 
       app.delete('/api/deleteAllTemplates', async(req,res)=>{
        console.log("here iam");
        const resutl= await formTemplate.deleteMany({});
        console.log(resutl);
        if(!resutl) return res.status(400).send('not found');
        res.status(200).send("Deleted !");
    })
    
}
