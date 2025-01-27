'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()

    const onSubmit = handleSubmit(data => {
        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match')
            return
        }

        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password
            })
        })
            .then(response => {
                if (response.ok) {
                    router.push('/auth/login')
                }
            })
    })

    return (

        <div className="login-box" id="register-box">
            <h2>Registrar Cuenta</h2>
            <form onSubmit={onSubmit}>
                <div className="textbox">
                    {errors.username && (<span className="error">{errors.username.message as string}</span>)}
                    <input type="text" placeholder="Usuario" {...(register('username', { required: { value: true, message: 'Username is required' } }))} />
                </div>
                <div className="textbox">
                    {errors.email && (<span className="error">{errors.email.message as string}</span>)}
                    <input type="email" placeholder="Correo Electrónico" {...(register('email', { required: { value: true, message: 'Email is required' } }))} />
                </div>
                <div className="textbox">
                    {errors.password && (<span className="error">{errors.password.message as string}</span>)}
                    <input type="password" placeholder="Contraseña" {...(register('password', { required: { value: true, message: 'Password is required' } }))} />
                </div>
                <div className="textbox">
                    {errors.confirmPassword && (<span className="error">{errors.confirmPassword.message as string}</span>)}
                    <input type="password" placeholder="Confirmar Contraseña" {...(register('confirmPassword', { required: { value: true, message: 'Confirm Password is required' } }))} />
                </div>
                <input type="submit" value="Registrarse" className="btn" />
            </form>
            <Link className="links" href={'/auth/login'}>
                <p>¿Ya tienes cuenta? Inicia sesión</p>
            </Link>
        </div>
    )
}