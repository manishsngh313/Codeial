module.exports.home = function (req,res){
    return res.render('profile', {
        title:'users profile'
    })
}