import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const rows = await prisma.techStack.findMany({ orderBy: [{ position: 'asc' }, { id: 'asc' }] })
    // `label` is the category name the site groups icons by
    return NextResponse.json(rows.map(({ id, category, ...rest }) => ({ _id: String(id), label: category, ...rest })))
  } catch (error) {
    console.error('Failed to fetch tech stack:', error)
    return NextResponse.json({ error: 'Failed to fetch tech stack' }, { status: 500 })
  }
}
