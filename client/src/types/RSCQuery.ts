import { PAGE_SIZE } from "@/config/initialStates";
import { Filters, RSCQueryFilters } from "./filters";

export const createResourceQuery = (filters: Filters, page: number) => {
    const { order = 'asc', search = '', state, type, location } = filters
    const query: RSCQueryFilters = {
        where: {
            OR: [
                { title: { contains: search } },
                { author: { contains: search } }
            ]
        },
        orderBy: {
            title: order
        },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE
    }

    if (state) query.where = { ...query.where, stateId: state }
    if (type) query.where = { ...query.where, typeId: type }
    if (location) query.where = { ...query.where, locationName: location }

    return query
}