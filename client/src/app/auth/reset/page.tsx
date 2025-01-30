'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function Reset() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [message, setMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm()

    const token = searchParams.get('token')

    const onSubmit = handleSubmit(data => {
        const { newPassword, confirmNewPassword } = data

        if (newPassword !== confirmNewPassword) {
            alert('Passwords do not match')
            return
        }

        if (!token) {
            setMessage('No hay token')
            return
        }

        fetch('/api/auth/reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token,
                newPassword
            })
        })
            .then(response => response.json())
            .then(res => {
                setMessage(res.message)
                if (res.success){
                    router.push('/auth/login')
                }
            })
    })


    return (
        <>
            <div className="login-box">
                <h1>Cambia la contraseña</h1>
                <form onSubmit={onSubmit}>
                    <div className="textbox">
                        {
                            errors.newPassword && (
                                <span className="error">{errors.newPassword.message as string}</span>
                            )
                        }
                        <input type="password" placeholder="New password" {...(register('newPassword', { required: { value: true, message: 'New password is required' } }))} />
                    </div>
                    <div className="textbox">
                        {
                            errors.confirmNewPassword && (
                                <span className="error">{errors.confirmNewPassword.message as string}</span>
                            )
                        }
                        <input type="password" placeholder="Confirm new Password" {...(register('confirmNewPassword', { required: { value: true, message: 'Confirm new password is required' } }))} />
                    </div>
                    <input type="submit" value="Registrarse" className="btn" />
                </form>
                {message && <p>{message}</p>}
            </div>
        </>
    )
}