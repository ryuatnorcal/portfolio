import { Project } from "@/models/project";
import { connectToDb } from "@/utils/mongoose";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDb()
    const projects = await Project.find()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to fetch Project:', error)
    return NextResponse.json({ error: 'Failed to fetch Project' }, { status: 500 })
  }
}