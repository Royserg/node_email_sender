const nodemailer = require('nodemailer')

const sendMail = (recipient, subject, html, cc) => {
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: '[credentials.username]',
      pass: '[credentials.password]',
    },
    maxConnections: 3,
  })

  const mailOptions = {
    from: '[sender]',
    to: recipient,
    subject,
    html,
    cc,
    attachments: [],
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        return reject(mailOptions.recipient)
      } else {
        return resolve('Email Sent!')
      }
    })
  })
}

module.exports = sendMail