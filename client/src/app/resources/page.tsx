'use client'

import RSCCatalog from "@/components/RSCCatalog"
import { filtersInitialState } from "@/config/initialStates"
import { DataFilters, Filters } from "@/types/filters"
import { createResourceQuery } from "@/types/RSCQuery"
import { Resource } from "@prisma/client"
import { useEffect, useState } from "react"
import './styles.css'
import { Session } from "next-auth"

export default function Resources() {
    const [page, setPage] = useState(1)
    const [length, setLength] = useState(0)
    const [data, setData] = useState<Resource[]>([])
    const [dataFilters, setDataFilters] = useState<DataFilters>({ states: [], types: [], locations: [] })
    const [filters, setFilters] = useState<Filters>(filtersInitialState)
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        fetch('/api/resources', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: createResourceQuery(filters, page) })
        })
            .then(res => res.json())
            .then(data => setData(data))

    }, [filters, page])

    useEffect(() => {
        fetch('/api/resources')
            .then(res => res.json())
            .then(data => setLength(data))

        fetch('/api/resources/filters')
            .then(res => res.json())
            .then(data => setDataFilters(data))

        fetch('/api/user')
            .then(res => res.json())
            .then(data => setSession(data))

    }, [])

    return (
        <>
            <h1 className="resource-title">Resources</h1>
            <RSCCatalog
                dataLength={length}
                data={data}
                dataFilters={dataFilters}
                filtersData={{ filters, setFilters }}
                pageData={{ page, setPage }}
                session={session}
            />
        </>
    )
}