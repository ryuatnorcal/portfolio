import { prisma } from "@/utils/prisma";
import { toCard } from "@/content/load";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const rows = await prisma.project.findMany({ orderBy: [{ position: 'asc' }, { id: 'asc' }] })
    return NextResponse.json(rows.map(toCard))
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
