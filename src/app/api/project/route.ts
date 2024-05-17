import { Project } from "@/models/project";
import { connectToDb } from "@/utils/mongoose";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    connectToDb()
    const bio = await Project.find()
    return NextResponse.json(bio)
  } catch (error) {
    throw new Error('Failed to fetch Project')
  }
}