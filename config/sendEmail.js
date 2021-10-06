var nodemailer = require('nodemailer');

function sendResetLink(email, password) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'orisonfonseca@gmail.com',
          pass: 'netgear2320908'
        }
      });
      
      var mailOptions = {
        from: 'noreply@gmail.com',
        to: [email],
        subject: 'Reset Password',
        text: `Your pasword is ${password}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}


module.exports = sendResetLink;