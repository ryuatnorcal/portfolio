import { TechStack } from "@/models/techstack";
import { connectToDb } from "@/utils/mongoose";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDb()
    const techstack = await TechStack.find()
    return NextResponse.json(techstack)
  } catch (error) {
    console.error('Failed to fetch TechStack:', error)
    return NextResponse.json({ error: 'Failed to fetch TechStack' }, { status: 500 })
  }
}