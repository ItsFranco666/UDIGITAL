'use client'

import Link from 'next/link';
import './account.css'

export default async function Account({ children, }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <h2 className='title'>Configuración de Cuenta</h2>
            <main className='account-main-container'>
                <aside className='account-aside'>
                    <ul>
                        <Link href={'/account/userData'}>
                            <li>Tus datos</li>
                        </Link>
                        <Link href={'/account/general'}>
                            <li>Actualizar datos</li>
                        </Link>
                        <Link href={'/account/history'}>
                            <li>Historial</li>
                        </Link>
                    </ul>
                </aside>
                {children}
            </main>
        </>
    );
}
