'use client'

import { signOut } from "next-auth/react"

export default function Logout() {
    const onClick = () => {
        fetch('/api/account/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'Cierre de sesión' })
        })

        signOut({
            callbackUrl: '/'
        })
    }
    return (
        <div className="login-box" id="logout-box">
            <h2>Cerrar Sesión</h2>
            <p>¿Esta seguro de cerrar sesión?</p>
            <input type="button" className="btn" value='Cerrar sesión' onClick={onClick} />
        </div>
    )
}