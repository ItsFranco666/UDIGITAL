'use client'

import { reservesAndResourceInitialState } from "@/config/initialStates"
import { userReserve } from "@/types/reserves"
import { formatDate, formatTime } from "@/utils/dateFormatter"
import { useEffect, useState } from "react"

export default function UserData() {
    const [userAndReserves, setUserAndReserves] = useState<userReserve>(reservesAndResourceInitialState)
    const [onCancel, setOnCancel] = useState(false)
    const [reserveId, setReserveId] = useState<string | null>(null)
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch('/api/reserves?type=Reserva', )
            .then(res => res.json())
            .then(data => setUserAndReserves(data))
    }, [onCancel])

    useEffect(() => {
        if (!onCancel) return

        fetch('/api/reserves', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: reserveId, reserveState: 'Cancelada', resourceState: 'Disponible' })
        })
            .then(res => res.json())
            .then(data => setMessage(data.message))

        fetch('/api/account/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: `Cancelación de reserva con id: ${reserveId}` })
        })

        setOnCancel(false)
        
    }, [reserveId])

    const handleOnClick = (id: string) => {
        if (confirm('¿Seguro que quiere cancelar su reserva?') && id) {
            setOnCancel(true)
            setReserveId(id)
            return
        }
        setOnCancel(false)
        setReserveId(null)
        return
    }

    return (
        <div className="account-general-container">
            <h2>Reservas de {userAndReserves.username}</h2>
            {message && <p className="reserve-message">{message}</p>}
            <table className="reservesTable">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Fecha de Reserva</th>
                        <th>Hora de Inicio</th>
                        <th>Hora de Fin</th>
                        <th>Autor</th>
                        <th>Ubicación</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userAndReserves.Reserve && userAndReserves.Reserve.map((res) => (
                        <tr key={res.resource.id}>
                            <td>{res.resource.title}</td>
                            <td>{res.reserveDate ? formatDate(res.reserveDate.toLocaleString()) : 'No hay fecha de reserva'}</td>
                            <td>{res.startTime ? formatTime(res.startTime) : 'No hay tiempo inicial de reserva'}</td>
                            <td>{res.endTime ? formatTime(res.endTime) : 'No hay tiempo final de reserva'}</td>
                            <td>{res.resource.author}</td>
                            <td>{res.resource.locationName}</td>
                            <td>{res.stateName}</td>
                            {res.stateName === 'Reservado' ? <td><button onClick={() => handleOnClick(res.id ?? '')}>Cancelar reserva</button></td> : <td></td>}
                        </tr>
                    )).reverse()}
                </tbody>
            </table>
        </div>

    )
}