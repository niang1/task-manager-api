const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mniang.mouhamadou@gmail.com',
    pass: 'zyuw vbmw ertj jzrq', // Use app password here!
  },
});

const mailOptions = {
  from: 'mniang.mouhamadou@gmail.com',
  to: 'niang1@hotmail.com',
};

module.exports = { transporter, mailOptions };
