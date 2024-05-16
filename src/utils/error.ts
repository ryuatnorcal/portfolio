import { NextResponse } from "next/server"

const Error = (message: string) => {
  return NextResponse.json({
    status: 'error',
    data: {
      message
    }
   })
}

export default Error