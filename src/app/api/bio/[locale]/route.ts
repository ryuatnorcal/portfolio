import { Bio } from "@/models/bio";
import { connectToDb } from "@/utils/mongoose";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  params: {
    locale: string
  }
}
export const GET = async (req: NextRequest, {params}: Params) => {
  const { locale = 'en' } = params
  
  try {
    connectToDb()
    const bio = await Bio.findOne({ locale })
    return NextResponse.json(bio)
  } catch (error) {
    throw new Error('Failed to fetch bio')
  }
}