import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOptions)
    const userWithHistory = await prisma.user.findMany({
        where: {
            email: session?.user?.email as string
        },
        select: {
            username: true,
            History: true
        }
    })

    return NextResponse.json(userWithHistory[0], { status: 200 })
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    const { action } = await req.json()
    const id = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        },
        select: {
            id: true
        }
    })

    if (!id?.id) {
        throw new Error('No existe el id del usuario.')
    }
    await prisma.history.create({
        data: {
            action,
            userId: id.id
        }
    })


    return NextResponse.json({ message: 'Acción añadida al historial' }, { status: 200 })
}