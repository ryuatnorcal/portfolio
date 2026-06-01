import { Experience } from "@/models/experience";
import { connectToDb } from "@/utils/mongoose";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDb()
    const experiences = await Experience.find()
    return NextResponse.json(experiences)
  } catch (error) {
    console.error('Failed to fetch Experience:', error)
    return NextResponse.json({ error: 'Failed to fetch Experience' }, { status: 500 })
  }
}