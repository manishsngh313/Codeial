const User = require('../../../models/user');

const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){


    try {
        let user = await User.findOne({email: req.body.email});
        // console.log(jwt.sign(user.toJSON()));

        if(!user || user.password != req.body.password){
            return res.json(422, {
                massage:"Invalid username or password"
            });
        }
        


        return res.json(200, {
            massage: 'sign in successfully, here is your token and please keep it safe',
            data: {
                token: jwt.sign(user.toJSON() , 'codeial', {expiresIn: '600000'})
            }
        });
        
    } catch (err) {

        console.log('*******', error);
        return res.json(500, {
            massage:'error in deleting the post'
        })
    }
}