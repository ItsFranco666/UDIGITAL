import { CollectionProps } from "@/types/props";
import RSVModal from "./RSVModal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { validateTime, validateDate } from "@/utils/timeValidation";
import { Resource } from "@prisma/client";
import { formatDate, formatTime } from "@/utils/dateFormatter";

type FormData = {
    reserveDate: string;
    startTime: string;
    endTime: string;
    action: string,
    expirationDate: string
};

export default function ({ data, session }: CollectionProps) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [resource, setResource] = useState<Resource>()
    const [userId, setUserId] = useState('')
    const [typeForm, setTypeForm] = useState('Reserva')
    const startTime = watch("startTime")
    const type = watch("action")

    useEffect(() => {
        fetch('/api/account/userData')
            .then(res => res.json())
            .then(data => { setUserId(data.user.id) })
    }, [])

    useEffect(() => {
        setTypeForm(type)
    }, [type])

    const handleClick = (item: Resource) => {
        setResource(item)
        handleShow()
    }

    const handleShow = () => {
        setShow(prev => !prev)
    }

    const onSubmit = handleSubmit(data => {
        const { reserveDate, startTime, endTime } = data
        const stateId = data.action === 'Reserva' ? 'Reservado' : 'Prestado'
        const stateName = data.action === 'Reserva' ? 'Reservado' : 'Prestado'
        const resourceId = resource?.id

        const reserve = {
            userId: userId,
            reserveDate,
            startTime,
            endTime,
            stateName,
            resourceId,
            spaceId: null,
            type: data.action,
        }

        fetch('/api/reserves', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reserve, stateId, expirationDate: data.expirationDate })
        })
            .then(res => res.json())
            .then(data => setMessage(data.message))

        fetch('/api/account/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: `Reserva de ${resource?.title}` })
        })

        const reserveMessage = `Reserva exitosa
        Fecha de la reserva: ${reserveDate}
        Hora de inicio: ${startTime}
        Hora de finalización: ${endTime}`

        const loanMessage = `Préstamo exitosa
        Fecha del préstamo: ${reserveDate}
        Fecha de vencimiento: ${data.expirationDate}
        Hora de inicio: ${startTime}
        Hora de finalización: ${endTime}
        `

        handleShow()
        data.action === 'Reserva' ? alert(reserveMessage) : alert(loanMessage)
        window.location.reload()
    })

    return (
        <>
            <section className="collection">
                {data.map(item => (
                    <article key={item.id}>
                        <h2>{item.title}</h2>
                        {item.author && <p><strong>Autor: </strong>{item.author}</p>}
                        <p><strong>Locación: </strong>{item.locationName}</p>
                        <p><strong>Estado: </strong>{item.stateId}</p>
                        <p><strong>Tipo: </strong>{item.typeId}</p>
                        {session && (item.stateId === 'Disponible' || item.stateId === 'Prestado') && <button className={`btn-reserve ${session ? 'session' : ''}`} onClick={() => handleClick(item)}>Acción</button>}
                        {session && item.stateId === 'Digitalizado' && <button className={`btn-reserve ${session ? 'session' : ''}`} onClick={() => { console.log('abierto') }}>Ver recurso online</button>}
                    </article>
                ))}
                <RSVModal isOpen={show} session={session}>
                    <button onClick={handleShow} className="close-modal">✖</button>
                    <h2 className="title-form">{typeForm === "Reserva" ? "Reservar" : "Préstamo"}</h2>
                    <form className="form-dialog" onSubmit={onSubmit}>
                        <label htmlFor="action">Acción</label>
                        <select {...register('action', { required: { value: true, message: 'Action is required' } })}>
                            <option value="Reserva">Reservar</option>
                            {resource?.stateId !== 'Prestado' && (
                                <option value="Préstamo">Préstamo</option>
                            )}
                        </select>
                        {errors.action && (<span className="error">{errors.action.message as string}</span>)}
                        <label htmlFor="reserveDate">Día de {typeForm === "Reserva" ? "reserva" : "préstamo"}</label>
                        <input type="date" {...register('reserveDate', { required: { value: true, message: 'Reserve date is required' }, validate: validateDate })} />
                        {errors.reserveDate && (<span className="error">{errors.reserveDate.message as string}</span>)}
                        {typeForm === "Préstamo" && resource?.stateId !== 'Prestado' && (
                            <>
                                <label htmlFor="expirationDate">Día de expiración</label>
                                <input type="date" {...register('expirationDate', { required: { value: true, message: 'Loan date is required' }, validate: validateDate })} />
                                {errors.expirationDate && (<span className="error">{errors.expirationDate.message as string}</span>)}
                            </>
                        )}
                        <label htmlFor="startTime">Hora de inicio</label>
                        <input type="time" {...register('startTime', { required: { value: true, message: 'Start time is required' }, validate: (value) => validateTime(value, "start", startTime) })} />
                        {errors.startTime && (<span className="error">{errors.startTime.message as string}</span>)}
                        <label htmlFor="endTime">Hora de Finalización</label>
                        <input type="time" {...register('endTime', { required: { value: true, message: 'End time is required' }, validate: (value) => validateTime(value, "end", startTime) })} />
                        {errors.endTime && (<span className="error">{errors.endTime.message as string}</span>)}
                        <input type="submit" value="Reservar" />
                        {message && <p>{message}</p>}
                    </form>
                </RSVModal>
            </section>
        </>
    )
}