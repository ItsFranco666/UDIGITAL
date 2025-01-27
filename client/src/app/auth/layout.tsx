import Link from "next/link";
import './login.css'

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="login-container">
                {children}
            </div>
        </>
    );
}