module.exports.home = function (req,res){
    console.log(req.body);
    console.log(req.cookies);
    return res.render('home',{
        title: 'HOME'
    })
}