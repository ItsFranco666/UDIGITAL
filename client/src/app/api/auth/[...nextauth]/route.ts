import prisma from '@/config/prisma'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'email' },
                password: { label: 'Password', type: 'password', placeholder: 'password' }
            },
            async authorize(credentials, req) {
                const userFound = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (!userFound) throw new Error('User not found')
                 
                const matchPassword = await bcrypt.compare(credentials?.password as string, userFound.password)

                if (!matchPassword) throw new Error('Password incorrect')

                return {
                    id: userFound.id,
                    email: userFound.email,
                    name: userFound.username
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/logout'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }