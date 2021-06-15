const {winnerData} = require('../models/winner-data');
const { formTemplate } = require('../models/form-template');
module.exports = (app) => {
    //submitwinnerData 
    app.post('/api/submitWinnerData', (req, res) => {
        //var today = new Date();
        //var dd = String(today.getDate()).padStart(2, '0');
        //var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        //var yyyy = today.getFullYear();
        //today = Date.now();
        let shortId = req.body.shortId
        let uniqueValues;
        let ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
        let response;
        let isUnique = false;
        formTemplate.findOne({ shortId: shortId }).then((qResult) => {
            winnerData.findOne({ Ip: ip, shortId: req.body.shortId }).then((winnerObj) => {
                if (winnerObj) { response = "معلوماتك بالفعل موجودة"; return res.status(400).send(response); }
                qResult.extraField.forEach((elem) => {
                    if (elem.type == "unique") {
                        isUnique = true;
                        uniqueValues = elem.val;
                        if (uniqueValues.includes(req.body.formData[elem.name])) {
                            new winnerData({
                                submitionData: Date.now(),
                                formData: req.body.formData,
                                shortId: req.body.shortId,
                                competitionName: req.body.competitionName,
                                Ip: ip
                            }).save().then((result) => {
                                return res.json(result).status(200);
                            })
                        }
                        else { response = "عذراُ غير مصرح لك باستخدام النموذج"; return res.status(404).send(response); }
                    }
                });
                if (!isUnique) {
                    new winnerData({
                        submitionData: Date.now(),
                        formData: req.body.formData,
                        shortId: req.body.shortId,
                        competitionName: req.body.competitionName,
                        Ip: ip
                    }).save().then((result) => {
                        return res.json(result).status(200);
                    })
                }
            })
        });
    })
    //get all winnerData
    app.get('/api/GetWinnersData', async(req , res)=>{
       const wResult = await winnerData.find();
       if (wResult){ res.json(wResult).status(200); }
        else res.status(404).send("no data");
    })
    app.get('/api/relatedwinners/:id',async(req,res)=>{
        const rResult = await winnerData.find({shortId : req.params.id});
        if (rResult){ res.json(rResult).status(200); }
        else res.status(404).send("no data");
    })
    //Delete user
    app.delete('/api/deleteWinners', async(req,res)=>{
        console.log("here iam");
        const resutl= await winnerData.deleteMany({});
        console.log(resutl);
        if(!resutl) return res.status(400).send('not found');
        res.status(200).send("Deleted !");
    })

}

