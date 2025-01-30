export interface Filters {
    search: string,
    order: string,
    state: string,
    type: string,
    location: string
}

export interface DataFilters {
    states: string[],
    types: string[],
    locations: string[]
}

export interface RSCQueryFilters {
    where: {},
    orderBy: {},
    skip: number,
    take: number,
}
