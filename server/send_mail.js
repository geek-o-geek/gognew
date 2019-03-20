var nodemailer = require('nodemailer'); 
module.exports.send_mail = obj => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: obj.cred_mail,
        pass: obj.cred_password
        }
    });

    var mailOptions = {
        from: obj.sender_mail,
        to: obj.receiver_mail,
        subject: obj.subject,
        text: obj.email_body
    };  
    if(obj.is_html)
        mailOptions['html'] = obj.email_body
    else
        mailOptions['text'] = obj.email_body

    transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log(error);
            return 0
        } else {
            console.log('Email sent: ' + info.response);
            return 1;
        }
    });
}