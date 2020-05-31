const nodeMailer =  require('../config/nodemailer');


exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');

    nodeMailer.transporter.sendMail({
        from:'manishpaldtu@gmail.com',
        to: comment.user.email,
        subject: "new comment published!",
        html: htmlString
    }, (err,info)=> {
        if (err){
            console.log('Error in sending the mail', err);
            return;
        }
        // console.log('message sent', info); 
        return;
    });
}


//aur koi dikkat ho sir toh call kr lena 
// phone no?
//9625961919
// ok thanks