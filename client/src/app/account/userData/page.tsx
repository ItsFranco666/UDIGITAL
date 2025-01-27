'use client'

import { useEffect, useState } from "react"

export default function UserData() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        createdAt: ''
    })

    useEffect(() => {
        fetch('/api/account/userData')
            .then(res => res.json())
            .then(data => {
                setUserData(data.user)
                console.log(data)
            })
    }, [])

    return (
        <div className="account-general-container">
            <h2>Tus datos</h2>
            <div className="user-details">
                <p><strong>Nombre de usuario:</strong> <span>{userData.username}</span></p>
                <p><strong>Correo electrónico:</strong> <span>{userData.email}</span></p>
                <p><strong>Fecha de creación:</strong> <span>{new Date(userData.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}</span></p>
            </div>
        </div>

    )
}