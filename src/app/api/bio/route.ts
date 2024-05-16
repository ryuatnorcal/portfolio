import { Bio } from "@/models/bio";
import { connectToDb } from "@/utils/mongoose";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    connectToDb()
    const bio = await Bio.findOne({ locale: 'en' })
    return NextResponse.json(bio)
  } catch (error) {
    throw new Error('Failed to fetch bio')
  }
}