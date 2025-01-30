import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()

        console.log(data)

        const [year, month, day] = data.reserve.reserveDate.split('-').map(Number);
        const [startHours, startMinutes] = data.reserve.startTime.split(':').map(Number);
        const [endHours, endMinutes] = data.reserve.endTime.split(':').map(Number);

        const reserveDate = new Date(Date.UTC(year, month - 1, day));
        const startDateTime = new Date(Date.UTC(year, month - 1, day, startHours, startMinutes));
        const endDateTime = new Date(Date.UTC(year, month - 1, day, endHours, endMinutes));
        if (data.expirationDate) {
            const [yearExp, monthExp, dayExp] = data.expirationDate.split('-').map(Number);
            const [endHoursExp, endMinutesExp] = data.reserve.endTime.split(':').map(Number);
            const expirationDate = new Date(Date.UTC(yearExp, monthExp - 1, dayExp));
            const endDateTimeExp = new Date(Date.UTC(yearExp, monthExp - 1, dayExp, endHoursExp, endMinutesExp));
            await prisma.reserve.create({
                data: {
                    ...data.reserve,
                    startTime: startDateTime,
                    endTime: endDateTimeExp,
                    reserveDate,
                    expirationDate: expirationDate
                }
            })
        } else {
            await prisma.reserve.create({
                data: {
                    ...data.reserve,
                    startTime: startDateTime,
                    endTime: endDateTime,
                    reserveDate,
                    expirationDate: reserveDate
                }
            })
        }



        if (data.reserve.resourceId) {
            await prisma.resource.update({
                where: {
                    id: data.reserve.resourceId
                },
                data: {
                    stateId: data.stateId
                }
            })
        } else if (data.spaceId) {
            await prisma.space.update({
                where: {
                    id: data.reserve.spaceId
                },
                data: {
                    state: data.stateId
                }
            })
        }

        return NextResponse.json({ message: 'Reserva creada' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 })
    }
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)

    const type = req.nextUrl.searchParams.get('type') as string | undefined
    const userWithReserves = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        },
        select: {
            username: true,
            Reserve: {
                where: {
                    type: type ?? undefined
                },
                select: {
                    id: true,
                    endTime: true,
                    reserveDate: true,
                    startTime: true,
                    space: true,
                    resource: true,
                    stateName: true,
                    expirationDate: true
                }
            }
        }
    })
    return NextResponse.json(userWithReserves, { status: 200 })
}

export async function PATCH(req: NextRequest) {
    try {
        const { id, reserveState, resourceState, isRenew } = await req.json()

        console.log(isRenew)
        if (!isRenew) {
            await prisma.reserve.update({
                where: {
                    id
                },
                data: {
                    State: { connect: { name: reserveState } },
                    resource: {
                        update: {
                            stateId: resourceState
                        }
                    }
                }
            })
        } else {
            const expirationDate = await prisma.reserve.findUnique({
                where: {
                    id
                },
                select: {
                    expirationDate: true
                }
            })

            if (expirationDate) {
                await prisma.reserve.update({
                    where: {
                        id
                    },
                    data: {
                        State: { connect: { name: reserveState } },
                        expirationDate: new Date(expirationDate.expirationDate.getTime() + 1000 * 60 * 60 * 24),
                        resource: {
                            update: {
                                stateId: resourceState
                            }
                        }
                    }
                })
            }
        }


        return NextResponse.json({ message: 'Acción realizada correctamente' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Error cancelando la reserva' }, { status: 400 })
    }
}