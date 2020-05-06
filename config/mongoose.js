var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(err) {
  if (err){
    console.log(err);
  }
  // we're connected!
  console.log('mongoose is connected')
});

module.exports = db;