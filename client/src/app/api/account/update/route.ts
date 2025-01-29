import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req: NextRequest) {
    const { newUsername, newEmail, newPassword } = await req.json()
    const session = await getServerSession(authOptions)

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        }
    })

    let hashedPassword: string = ''
    if (newPassword){
        hashedPassword = await bcrypt.hash(newPassword, 10)
    }

    const updateUser = {
        username: newUsername || user?.username,
        email: newEmail || user?.email,
        password: hashedPassword || user?.password 
    }

    await prisma.user.update({
        where: {
            id: user?.id as string
        },
        data: {
            ...updateUser
        }
    })

    return NextResponse.json({ message: 'Usuario actualizado' }, { status: 200 })
}