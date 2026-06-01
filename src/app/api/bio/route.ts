import { Bio } from "@/models/bio";
import { connectToDb } from "@/utils/mongoose";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDb()
    const bio = await Bio.find()
    return NextResponse.json(bio)
  } catch (error) {
    console.error('Failed to fetch bio:', error)
    return NextResponse.json({ error: 'Failed to fetch bio' }, { status: 500 })
  }
}