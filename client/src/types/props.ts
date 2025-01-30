import { Resource } from "@prisma/client"
import { DataFilters, Filters } from "./filters"
import { Dispatch, SetStateAction } from "react"
import { Session } from "next-auth"

export interface InputProps {
    name: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface SelectProps {
    data: string[]
    filter: string,
    name: string,
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

interface session {
    session: Session | null
}

export interface CollectionProps extends session {
    data: Resource[]
}

export interface FiltersProps extends session {
    filters: Filters,
    dataFilters: DataFilters,
    handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void,
    handleOrderChange: (order: string) => void
}

export interface CatalogProps extends session {
    data: Resource[],
    dataFilters: DataFilters,
    filtersData: {
        filters: Filters,
        setFilters: Dispatch<SetStateAction<Filters>>
    }
    pageData: {
        page: number,
        setPage: Dispatch<SetStateAction<number>>
    },
    dataLength: number
}

export interface PaginationProps extends session {
    handlePrev: () => void,
    handleNext: () => void,
    handlePageChange: (idx: number) => void,
    total: number
}

export interface ModalProps extends session {
    isOpen: boolean,
    children: React.ReactNode
}