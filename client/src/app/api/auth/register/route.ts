import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import prisma from "@/config/prisma";

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json()

        const userFound = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            }
        })

        if (userFound) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 })
        }

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: await bcrypt.hash(password, 10)
            }
        })

        return NextResponse.json({ ...newUser, password: undefined })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}