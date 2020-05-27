module.exports.index = function(req,res){
    return res.json(200,{
        message2: 'list of posts',
        posts2: []
    });
}