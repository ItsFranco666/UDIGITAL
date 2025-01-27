'use client'

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState<string>("");
    const onSubmit = handleSubmit(async (data) => {
        const res = await signIn('credentials', {
            password: data.password,
            email: data.email,
            redirect: false
        })

        if (res?.error) {
            setError(res.error)
        } else {
            fetch('/api/account/history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'Inicio de sesión' })
            }).catch(err => setError(err.message))
            router.push('/account/userData')
            router.refresh()
        }
    })

    return (
        <div className="login-box" id="login-box">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={onSubmit}>
                <div className="textbox">
                    {errors.email && (<span className="error">{errors.email.message as string}</span>)}
                    <input type="email" placeholder="Email" {...(register('email', { required: { value: true, message: 'Email is required' } }))} />
                </div>
                <div className="textbox">
                    {errors.password && (<span className="error">{errors.password.message as string}</span>)}
                    <input type="password" placeholder="Password" {...(register('password', { required: { value: true, message: 'Password is required' } }))} />
                </div>
                <input type="submit" value="Entrar" className="btn" />
                {error && <span className="error">{error}</span>}
            </form>
            <Link className="links" href={'/auth/register'}>
                <p>¿No tienes cuenta? Regístrate</p>
            </Link>
            <Link className="links" href={'/auth/forgot'}>
                <p>¿Olvidaste tu contraseña?</p>
            </Link>
        </div>
    );
}