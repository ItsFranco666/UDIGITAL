import prisma from "@/config/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const types = (await prisma.type.findMany()).map(({name}) => name)
    const states = (await prisma.state.findMany()).map(({name}) => name)
    const locations = (await prisma.location.findMany()).map(({name}) => name)
    return NextResponse.json({ types, states, locations}, { status: 200 })
}