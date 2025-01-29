'use client'

import { History as history } from "@prisma/client"
import { useEffect, useState } from "react"
import dateFormatter from "@/utils/dateFormatter"
import './history.css'

interface userHistory {
    username: string,
    History: history[]
}

export default function History() {
    const [userAndHistory, setUserAndHistory] = useState<userHistory>({
        username: '',
        History: [{
            id: '',
            action: '',
            date: new Date(),
            userId: ''
        }]
    })
    useEffect(() => {
        fetch('/api/account/history')
            .then(res => res.json())
            .then(data => {
                setUserAndHistory({
                    History: data.History.map((data: history) => {
                        return {
                            ...data,
                            date: new Date(data.date)
                        }
                    }).reverse(),
                    username: data.username
                })
            })
    }, [])

    return (
        <div className="account-general-container">
            <h2>Historial de {userAndHistory.username}</h2>
            <table className="history-table">
                <thead>
                    <tr>
                        <th>Acción</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {userAndHistory.History.map((entry) => (
                        <tr key={entry.id}>
                            <td>{entry.action}</td>
                            <td>
                                {dateFormatter(entry.date)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}