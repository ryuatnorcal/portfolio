import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const rows = await prisma.project.findMany({ orderBy: [{ position: 'asc' }, { id: 'asc' }] })
    return NextResponse.json(rows.map(({ id, modalTitle, modalYear, modalImg, modalDescription, modalUrl, ...rest }) => ({
      _id: String(id),
      ...rest,
      // the site opens a detail popup only for projects that have one
      ...(modalTitle ? {
        modal: {
          title: modalTitle,
          year: modalYear || '',
          img: modalImg || '',
          description: modalDescription || '',
          url: modalUrl || '',
        },
      } : {}),
    })))
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
