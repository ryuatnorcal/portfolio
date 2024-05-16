'use server'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'
import Error from '@/utils/error'
type ResponseData = {
  message: string
}
 
export const POST = async (
  req: NextApiRequest
) => {
  try {
    const formData = await req.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    if (email === null || email === '' || !email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      return Error('Invalid Email')
    }

    if (name === null || name === '') {
      console.log('Name is required')
      return Error('Name is required')
    }

    if (message === null || message === '') {
      return Error('Message is required')
    }



    const mailerSend = new MailerSend({
      apiKey: process.env.MAIL_SEND_API_KEY,
    });
    
    const sentFrom = new Sender(process.env.EMAIL_FROM, "Portfolio Contact");
    
    const recipients = [
      new Recipient(process.env.EMAIL_TO, "Portfolio Contact"),
    ];
    
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(`Portfolio has received a new message from ${name}`)
      .setText(`
        Portfolio has received a new message from ${name}\n
        Name: ${name}\n
        Email: ${email}\n
        Message: ${message}\n
        Timestamp: ${new Date().toDateString()}\n
      `);
    
    await mailerSend.email.send(emailParams);
    return NextResponse.json({
      status: 'success',
      data: {
        message: 'Email sent'
      }
    })
    
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}