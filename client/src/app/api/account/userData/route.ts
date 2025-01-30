import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions)
    return NextResponse.json({
        user: await prisma.user.findUnique({
            where: {
                email: session?.user?.email as string
            },
            select: {
                createdAt: true,
                email: true,
                username: true,
                id: true
            }
        })
    }, { status: 200 })
}