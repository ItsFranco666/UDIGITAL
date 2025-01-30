import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    return NextResponse.json(await getServerSession(authOptions), { status: 200 })
}