import { Filters } from "@/types/filters";

export const filtersInitialState: Filters = {
    order: 'asc',
    search: '',
    state: '',
    type: '',
    location: ''
}

export const reservesAndResourceInitialState = {
    username: '',
    Reserve: [{
        reserveDate: new Date(),
        expirationDate: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        space: null,
        stateName: '',
        resource: {
            id: '',
            author: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            resourceId: '',
            locationName: '',
            stateId: '',
            title: '',
            typeId: ''
        },
    }]
}

export const PAGE_SIZE = 5;
