import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

// In display order (position ascending).
export const GET = async () => {
  try {
    const rows = await prisma.experience.findMany({ orderBy: [{ position: 'asc' }, { id: 'asc' }] })
    return NextResponse.json(rows.map(({ id, ...rest }) => ({ _id: String(id), ...rest })))
  } catch (error) {
    console.error('Failed to fetch experience:', error)
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 })
  }
}
