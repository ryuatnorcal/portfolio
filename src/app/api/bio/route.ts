import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const bio = await prisma.bio.findMany()
    return NextResponse.json(bio)
  } catch (error) {
    console.error('Failed to fetch bio:', error)
    return NextResponse.json({ error: 'Failed to fetch bio' }, { status: 500 })
  }
}
