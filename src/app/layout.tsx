import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'WEDDING ULFA DAN HASAN',
    description:
        'Undangan pernikahan digital untuk pernikahan Ulfa & Hasan pada tanggal 27 April 2025. Temukan informasi lengkap tentang lokasi, waktu acara. Hadirkan kebahagiaan dengan berbagi momen spesial ini bersama kami!',
    icons: {
        icon: '/favicon.jpg',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="description"
                    content=" Undangan pernikahan kami! Jangan lupa untuk hadir dan merayakannya bersama kami! "
                />
                <meta property="og:title" content="Undangan Pernikahan Ulfa & hasan" />
                <meta
                    property="og:description"
                    content="  Jangan lupa untuk hadir di acara kami! Terima Kasih "
                />

                {/* Meta tag gambar */}
                <meta
                    property="og:image"
                    content="https://wedding-ulfa-hasan.netlify.app/favicon.jpg"
                />
                <meta property="og:url" content="https://wedding-ulfa-hasan.netlify.app/" />
                <meta property="og:type" content="website" />
                <meta property="og:image:type" content="image/jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon.jpg" />
            </head>
            <body className={` antialiased`}>
                {children}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
                    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </body>
        </html>
    )
}
