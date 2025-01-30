import prisma from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { query } = await req.json()
    const resources = await prisma.resource.findMany(query)
    return NextResponse.json(resources, { status: 200 })
}

export async function GET() {
    return NextResponse.json((await prisma.resource.findMany()).length, { status: 200 })
}