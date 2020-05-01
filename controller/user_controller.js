module.exports.home = function (req,res){
    return res.render('profile', {
        title:'users profile'
    })
}

module.exports.signIn = function (req,res){
    return res.render('user_sign_in',{
        title:"codeial | sign in"
    })
}

module.exports.signUp = function (req,res){
    return res.render('user_sign_up',{
        title:"codeial | sign up"
    });
}