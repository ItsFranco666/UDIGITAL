import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions)
    return NextResponse.json({ message: 'test' }, { status: 200 })
}