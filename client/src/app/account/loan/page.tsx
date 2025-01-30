'use client'

import { reservesAndResourceInitialState } from "@/config/initialStates"
import { userReserve } from "@/types/reserves"
import { formatDate, formatTime } from "@/utils/dateFormatter"
import { useEffect, useState } from "react"
import './style.css'

export default function UserData() {
    const [userAndReserves, setUserAndReserves] = useState<userReserve>(reservesAndResourceInitialState)
    const [onChange, setOnChange] = useState(false)
    const [reserveId, setReserveId] = useState<string | null>(null)
    const [message, setMessage] = useState('')
    const [action, setAction] = useState('')

    useEffect(() => {
        fetch('/api/reserves?type=Préstamo')
            .then(res => res.json())
            .then(data => setUserAndReserves(data))

    }, [onChange])

    useEffect(() => {
        if (!onChange) return

        let actionMessage
        let reserveState
        if (action === 'Cancel') {
            actionMessage = `Cancelación de préstamo con id: ${reserveId}`
            reserveState = 'Cancelada'
        } else if (action === 'Renew') {
            actionMessage = `Renovación de préstamo con id: ${reserveId}`
            reserveState = 'Renovada'
        } else if (action === 'Return') {
            actionMessage = `Devolución de recurso de préstamo con id: ${reserveId}`
            reserveState = 'Devuelta'
        }

        fetch('/api/reserves', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: reserveId, reserveState, resourceState: action === 'Renew' ? 'Prestado' : 'Disponible', isRenew: action === 'Renew' })
        })
            .then(res => res.json())
            .then(data => setMessage(data.message))

        fetch('/api/account/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: actionMessage })
        }).then(res => {
            if (res.ok) {
                setOnChange(false)
            }
        })

    }, [reserveId])

    const handleOnClick = (id: string, action: string) => {
        setAction(action)

        if (action === 'Cancel') {
            handleOnCancel(id)
        } else if (action === 'Renew') {
            handleOnRenew(id)
        } else if (action === 'Return') {
            handleOnReturn(id)
        }
    }

    const handleOnCancel = (id: string) => {
        if (confirm('¿Seguro que quiere cancelar su préstamo?') && id) {
            setOnChange(true)
            setReserveId(id)
            return
        }
        setOnChange(false)
        setReserveId(null)
        return
    }

    const handleOnRenew = (id: string) => {
        if (confirm('¿Seguro que quiere renovar su préstamo? Recuerde que las renovaciones son de 1 día') && id) {
            setOnChange(true)
            setReserveId(id)
            return
        }
        setOnChange(false)
        setReserveId(null)
        return
    }

    const handleOnReturn = (id: string) => {
        if (confirm('¿Seguro que quiere devolver su recurso de préstamo?') && id) {
            setOnChange(true)
            setReserveId(id)
            return
        }
        setOnChange(false)
        setReserveId(null)
        return
    }

    return (
        <div className="account-general-container">
            <h2>Prestamos de {userAndReserves.username}</h2>
            {message && <p className="reserve-message">{message}</p>}
            <table className="reservesTable">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Fecha de Préstamo</th>
                        <th>Fecha de expiración</th>
                        <th>Hora de Inicio</th>
                        <th>Hora de Fin</th>
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
                            <td>{res.expirationDate ? formatDate(res.expirationDate.toLocaleString()) : 'No hay fecha de reserva'}</td>
                            <td>{res.startTime ? formatTime(res.startTime) : 'No hay tiempo inicial de reserva'}</td>
                            <td>{res.endTime ? formatTime(res.endTime) : 'No hay tiempo final de reserva'}</td>
                            <td>{res.resource.locationName}</td>
                            <td>{res.stateName}</td>
                            {res.stateName === 'Prestado' || res.stateName === 'Renovada' ? (
                                <>
                                    <td className="buttons">
                                        <button className="cancel" onClick={() => handleOnClick(res.id ?? '', 'Cancel')}>Cancelar préstamo</button>
                                        <button className="renew" onClick={() => handleOnClick(res.id ?? '', 'Renew')}>Renovar préstamo</button>
                                        <button className="return" onClick={() => handleOnClick(res.id ?? '', 'Return')}>Devolver recurso</button>
                                    </td>
                                </>
                            ) : <td></td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}