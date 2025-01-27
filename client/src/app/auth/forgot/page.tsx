'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"

export default function Forgot() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [message, setMessage] = useState('')

    const onSubmit = handleSubmit(data => {
        console.log(
            data
        )
        fetch('/api/auth/forgot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(({ message }) => setMessage(message || 'Verifica tu correo para continuar.'))
    })

    return (
        <>
            <div className="login-box">
                <h1>Recuperación de contraseña</h1>
                <form onSubmit={onSubmit}>
                    <div className="textbox">
                        {
                            errors.email && (
                                <span className="error">{errors.email.message as string}</span>
                            )
                        }
                        <input type="email" placeholder="Email" {...(register('email', { required: { value: true, message: 'Email is required' } }))} />
                    </div>
                    <input type="submit" value="Enviar" className="btn" />
                </form>
                {message && <p>{message}</p>}
            </div>
        </>
    )
}