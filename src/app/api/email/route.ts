'use server'
import { NextResponse, NextRequest  } from 'next/server'
import nodemailer from 'nodemailer'
import ApiError from '@/utils/error'

const regx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

// SMTP settings (Gmail: SMTP_HOST=smtp.gmail.com, SMTP_PORT=465, SMTP_USER=the
// address, SMTP_PASS=an app password). EMAIL_DRY_RUN=true skips sending, for
// local testing without credentials.
const SMTP_KEYS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'EMAIL_FROM', 'EMAIL_TO'] as const

export const POST = async (
  req: NextRequest
) => {
  try {
    const formData = await req.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    if (email === null
      || email === ''
      || (typeof email === 'string' && !email.match(regx))) {
      return ApiError('Invalid Email')
    }

    if (name === null || name === '') {
      return ApiError('Name is required')
    }

    if (message === null || message === '') {
      return ApiError('Message is required')
    }

    if (process.env.EMAIL_DRY_RUN === 'true') {
      return NextResponse.json({
        status: 'success',
        data: { message: 'Email sent (EMAIL_DRY_RUN: skipped send)' },
      })
    }

    // Without SMTP settings nothing can be sent: say so instead of reporting
    // success for a message that went nowhere.
    const missing = SMTP_KEYS.filter((key) => !process.env[key])
    if (missing.length) {
      console.error(`Contact form: email not sent, missing ${missing.join(', ')}`)
      return ApiError('Sorry, the message could not be sent. Please try again later.')
    }

    const port = Number(process.env.SMTP_PORT)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      // 465 is TLS from the start; other ports (587) upgrade with STARTTLS
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      // replying to the notification goes to the visitor
      replyTo: String(email),
      subject: `Portfolio has received a new message from ${name}`,
      text: `
        Portfolio has received a new message from ${name}\n
        Name: ${name}\n
        Email: ${email}\n
        Message: ${message}\n
        Timestamp: ${new Date().toDateString()}\n
      `
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      status: 'success',
      data: {
        message: 'Email sent'
      }
    })

  } catch (error) {
    console.error('Contact form: sending failed:', error)
    return NextResponse.json({
      status: 'error',
      data: { message: 'Sorry, the message could not be sent. Please try again later.' }
    })
  }
}
