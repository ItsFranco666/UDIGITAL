import { PAGE_SIZE } from "@/config/initialStates";
import RSCCollection from "./RSCCollection";
import RSCFilters from "./RSCFilters";
import RSCPagination from "./RSCPagination";
import { CatalogProps } from "@/types/props";

export default function ({ data, dataFilters, filtersData, pageData, dataLength, session }: CatalogProps) {
    const { filters, setFilters } = filtersData
    const { page, setPage } = pageData

    type handle = HTMLInputElement | HTMLSelectElement

    const handleChange = (e: React.ChangeEvent<handle>) => {
        const { name, value } = e.target
        setFilters(prev => ({ ...prev, [name]: value }))
    }

    const handleOrderChange = (order: string) => {
        setFilters(prev => ({ ...prev, order }))
    }

    const handlePrev = () => {
        setPage(page === 1 ? 1 : page - 1)
    }
    const handleNext = () => {
        setPage(page === Math.ceil(dataLength / PAGE_SIZE) ? Math.ceil(dataLength / PAGE_SIZE) : page + 1)
    }
    const handlePageChange = (idx: number) => {
        setPage(1 + idx)
    }

    return (
        <>
            <RSCFilters
                filters={filters}
                dataFilters={dataFilters}
                handleChange={handleChange}
                handleOrderChange={handleOrderChange}
                session={session}
            />
            <RSCCollection
                data={data}
                session={session}
            />
            <RSCPagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                handlePageChange={handlePageChange}
                total={dataLength}
                session={session}
            />
        </>
    )
}