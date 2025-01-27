import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Navbar() {
    const session = await getServerSession(authOptions);

    return (
        <nav className={session?.user ? 'logged-in' : ''}>
            {!session?.user ? (
                <>
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/resources">Resources</Link>
                        </li>
                        <li>
                            <Link href="/auth/login">Login</Link>
                        </li>
                    </ul>
                </>
            ) : (
                <>
                    <ul>
                        <li>
                            <Link href="/account/userData">Account</Link>
                        </li>
                        <li>
                            <Link href="/resources">Resources</Link>
                        </li>
                        <li>
                            <Link href="/auth/logout">Logout</Link>
                        </li>
                    </ul>
                </>
            )}
        </nav>
    );
}
