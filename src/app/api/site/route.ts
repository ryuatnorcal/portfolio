import { getServices, getSiteText } from "@/content/load";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

// Page copy, labels and the services list.
export const GET = async () => {
  try {
    const [text, services] = await Promise.all([getSiteText(), getServices()])
    return NextResponse.json({ text, services })
  } catch (error) {
    console.error('Failed to fetch site text:', error)
    return NextResponse.json({ error: 'Failed to fetch site text' }, { status: 500 })
  }
}
