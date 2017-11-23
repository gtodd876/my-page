const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: false }));
// NODE MAILER
app.post('/contact', (req, res) => {
  console.log('It worked');
  console.log(req.body);
  let transporter = nodemailer.createTransport(
    {
      host: 'smtp.gmail.com',
      port:587,
      secure:false,
      auth: {
        user: "toddmatthewsme@gmail.com",
        pass: "0dd0dd76"
      }
    }
  );
  let saveData = req.body;
  const html = `<html>
                  <body style="font-family:Arial;">
                    <p>Message from ${saveData.name} at ${saveData.email}</p>
                    <p>${saveData.message}</p>
                  </body>
                </html>`;
  
  let mailOptions = {
    to: 'gtmatthews@gmail.com',
    subject: 'nodemailer contact form',
    html: html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
  res.sendFile('success.html', {root: __dirname});
});

// ROUTES
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});
app.get('/contact', (req, res) => {
  res.sendFile('contact.html', {root: __dirname});
});
app.get('/resume', (req, res) => {
  res.sendFile('resume.html', {root: __dirname});
});
app.get('/portfolio', (req, res) => {
  res.sendFile('portfolio.html', {root: __dirname});
});

app.listen(3001, () => console.log('Server listening at http://127.0.0.1:3001 !'))

