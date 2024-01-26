const nodemailer = require('nodemailer');
const crypto = require('crypto');

const sendEmailNotification = (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    service: 'yahoo',
    secure: false,
    auth: {
      user: 'stalmant@yahoo.com',
      pass: 'pjwurfeipnhnpapk'
    },
    debug: false,
    logger: true,
    tls: {
      ciphers: 'SSLv3'
    }
  });

  const mailOptions = {
    from: 'stalmant@yahoo.com',
    to: email,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur d\'envoi de l\'e-mail:', error);
    } else {
      console.log('E-mail envoyé:', info.response);
    }
  });
};

module.exports = {
  sendEmailNotification
};
