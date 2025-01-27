import Link from "next/link";
import Navbar from "@/components/Navbar";
import '@/styles/nav.css'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <head>
          <title>UDigital</title>
        </head>
        <body>
          <header>
            <Link href={'/'}>
              <span>
                <h1>UDigital</h1>
                <h2>Recursos Digitales Universitarios</h2>
              </span>
            </Link>
            <Navbar />
          </header>
          {children}
        </body>
      </html>
  );
}