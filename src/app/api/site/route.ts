import { getInternalTools, getSectionFlags, getServices, getSiteText } from "@/content/load";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

// Page copy, labels, the services and internal tools lists, and which
// sections are shown.
export const GET = async () => {
  try {
    const [text, services, internalTools, sections] = await Promise.all([
      getSiteText(), getServices(), getInternalTools(), getSectionFlags(),
    ])
    return NextResponse.json({ text, services, internalTools, sections })
  } catch (error) {
    console.error('Failed to fetch site text:', error)
    return NextResponse.json({ error: 'Failed to fetch site text' }, { status: 500 })
  }
}
