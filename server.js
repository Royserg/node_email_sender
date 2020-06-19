const fs = require('fs')
const csv = require('csvtojson')

const sendMail = require('./mailer')
const createMessage = require('./message')


const logger = fs.createWriteStream('log.txt', {
  flags: 'a',
})

const csv_file = `${__dirname}/data/file.csv`

// Email meta
const emailSubject = '[Email subject]'
const cc = '[person in cc]'


/* csvtojson */
const converter = csv()
  .fromFile(csv_file)
  .then(async (json) => {
    for (let i = 0; i < json.length; i++) {
      const element = json[i];
      const email = element.field1
      const username = element.field2
      const password = element.field3

      console.log('element', element)

      // Generated email content
      const emailContent = createMessage(username, password)

      try {
        console.log('====== Mail ======')
        const result = await sendMail(email, emailSubject, emailContent, cc)
        console.log('=====', result, '=====')
      } catch (error) {
        console.error('Error - mail not sent to: ', error)
        logger.write(`Error sending to: ${error}`)
      }

    }
  })



