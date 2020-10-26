const { userAcc } = require('../models/user');
var passwordHash = require('password-hash');
var jwt = require("jsonwebtoken");
require('dotenv/config');//npm install dotenv
var auth = require('../middleware/auth');
module.exports = (app) => {
    let hashedPassword;
    //signIn
    app.post('/api/signin', async (req, res) => {
        const result = await userAcc.findOne({ "email": req.body.email });
        if (!result) return res.status(404).send("email");
        const isValid = passwordHash.verify(req.body.password, result.password);
        if (isValid) {

            const token = jwt.sign({ _id: result.id }, process.env.JWTKEY, { expiresIn: '1h' });
            logged(result, 1)
            res.status(200).json(token);
        }
        else {
            return res.status(404).send("somethingWrong");
        }
    })
    //signUp
    app.post('/api/signup', async (req, res) => {
        const resultf = await userAcc.findOne({ "email": req.body.email });
        if (resultf) {
            return res.send("you are already exist");
        }
        else {

            hashedPassword = passwordHash.generate(req.body.password);
            new userAcc({
                email: req.body.email,
                Username: req.body.Username,
                password: hashedPassword
            }).save()
                .then(result => {
                    res.send(result);
                });
        }
    })
    //signOut
    app.get('/api/signout',auth,async(req, res) => {
        logged(req.data,0)
        res.status(200).send("signed out");
    })
    //is Active
    app.get('/api/isActive', auth, async (req, res, next) => {
        return res.status(200).json(token);
    })
    //toSetLoggedValue
    async function logged(result, processFlag,token) {
        if (processFlag == 1) {
            const info = await userAcc.updateOne({ '_id': result._id },
                { $set: { Loggedin: true } })
                    if (info) {
                        return;
                    }
                    else {
                   
                    }
        }
        else {
     
                    const info = await userAcc.updateOne({ '_id': result },
                        { $set: { Loggedin: false } })
                    if (info) { 
                        return;
                    }
                    else {
                     
                    }
        }

    }
    //change pssaword
    app.put('/api/changePassword',async(req,res)=>{
        hashedPassword = passwordHash.generate(req.body.password);
        const user = await userAcc.updateOne({ 'email': req.body.email},
        { $set: { password : hashedPassword }})
        if (user) {
        return res.json(user).status(200);
        }else { return res.status(501).send("somethingWrong")}

    })
    //Delete user
    app.delete('/api/deleteUser', async(req,res)=>{
        console.log("here iam");
        const resutl= await userAcc.findOneAndRemove({email: req.body.email});
        console.log(resutl);
        if(!resutl) return res.status(400).send('not found');
        res.status(200).send("Deleted !");
    })
    
}
