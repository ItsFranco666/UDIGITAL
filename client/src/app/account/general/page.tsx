'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"

export default function General() {
    const { register, handleSubmit } = useForm()
    const [message, setMessage] = useState('')

    const onSubmit = handleSubmit(data => {
        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match')
            return
        }
        fetch('/api/account/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newUsername: data.username,
                newEmail: data.email,
                newPassword: data.password
            })
        })
            .then(res => res.json())
            .then(res => setMessage(res.message))
        fetch('/api/account/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'Actualización de datos' })
        })
    })
    return (
        <div className="account-general-container">
            <form className="account-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Nombre:</label>
                    <input type="text" placeholder="Tu nombre" {...(register('username'))} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" placeholder="Tu correo electrónico" {...(register('email'))} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Nueva Contraseña:</label>
                    <input type="password" placeholder="Tu nueva contraseña" {...(register('password'))} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input type="password" placeholder="Confirma tu nueva contraseña" {...(register('confirmPassword'))} />
                </div>
                <input type="submit" value="Guardar Cambios" className="btn-save" />
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}