import { getInternalTools, getServices, getSiteText } from "@/content/load";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

// Page copy, labels, and the services and internal tools lists.
export const GET = async () => {
  try {
    const [text, services, internalTools] = await Promise.all([getSiteText(), getServices(), getInternalTools()])
    return NextResponse.json({ text, services, internalTools })
  } catch (error) {
    console.error('Failed to fetch site text:', error)
    return NextResponse.json({ error: 'Failed to fetch site text' }, { status: 500 })
  }
}
