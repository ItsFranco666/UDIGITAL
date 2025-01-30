import { Reserve, Resource } from "@prisma/client"

type ReserveResource = Partial<Reserve> & {resource: Partial<Resource>}

export interface userReserve {
    username: string,
    Reserve: ReserveResource[]
}