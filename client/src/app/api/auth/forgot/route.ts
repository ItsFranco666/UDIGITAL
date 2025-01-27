import prisma from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { EMAIL_PASS, EMAIL_USER } from "@/config/envVar";

export async function POST(req: NextRequest) {
    const { email } = await req.json()

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    if (!process.env.NEXTAUTH_SECRET) {
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
    const token = jwt.sign({ email: user.email }, process.env.NEXTAUTH_SECRET, {
        expiresIn: '10m'
    })

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    })

    const resetURL = `${process.env.NEXTAUTH_URL}/auth/reset?token=${token}`
    transporter.sendMail({
        to: email,
        from: 'soporte@tu-dominio.com',
        subject: 'Restablecer contraseña',
        html: `<p>Haz clic en el enlace para restablecer tu contraseña:</p>
        <a href="${resetURL}">Restablecer contraseña</a>`,
    }, (error, info) => {
        if (error) {
            return console.log('Error al enviar el correo:', error);
        }
        console.log('Correo enviado:', info.response);
    })

    return NextResponse.json({ message: 'Correo enviado. Revisa tu bandeja de entrada.' }, { status: 200 })
}