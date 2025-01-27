import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/config/prisma'

export async function POST(req: NextRequest) {
    const { token, newPassword } = await req.json()
    console.log(token)

    try {
        if (!process.env.NEXTAUTH_SECRET) {
            throw new Error('NEXTAUTH_SECRET is not defined')
        }
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET) as jwt.JwtPayload
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        const user = await prisma.user.update({
            where: {
                email: decoded.email as string
            },
            data: {
                password: hashedPassword
            }
        })

        return NextResponse.json({ message: 'Contraseña cambiada exitosamente', success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Token inválido o expirado', success: false }, { status: 400 })
    }
}