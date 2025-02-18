import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

import nodemailer from 'nodemailer'
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses'
import { defaultProvider } from '@aws-sdk/credential-provider-node'

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: defaultProvider()
})

const transportLayer = nodemailer.createTransport({
  SES: {
    ses: sesClient,
    aws: { SendRawEmailCommand }
  }
})

const from = 'your@email.com'
const to = 'someone@else.com'

//* Sending a text-only email
const response = await transportLayer.sendMail({
  from,
  to,
  subject: 'Testing Sending from SES',
  text: 'This is a test email sent with Nodemailer and SES'
})
// */

/* Sending an HTML email.
const response = await transportLayer.sendMail({
  from,
  to,
  subject: 'Testing Sending from SES - HTML',
  text: 'This is a test email sent with Nodemailer and SES',
  html: '<h1>This is a test email sent with Nodemailer and SES</h1><img src="https://bluefox.email/assets/bluefoxemail-logo.png" width="200" alt="bluefox.email logo"/>'
})
// */

/* Sending an HTML email with attachments.
const response = await transportLayer.sendMail({
  from,
  to,
  subject: 'Testing Sending from SES - HTML with attachments',
  text: 'This is a test email sent with Nodemailer and SES',
  html: '<h1>This is a test email sent with Nodemailer and SES</h1>',
  attachments: [
    {
      'filename': 'example.txt',
      'content': 'Ymx1ZWZveC5lbWFpbCBhdHRhY2htZW50IGV4YW1wbGUh',
      'encoding': 'base64'
    }
  ]
})
// */

console.log(response)
