import type { Metadata, Viewport } from 'next';
import './globals.css';
import Script from 'next/script';
import SessionProvider from '@/presentation/components/SessionProvider';

export const metadata: Metadata = {
  title: 'Gestor de Horários · ESAGRADA v4.2.4',
  description: 'Plataforma Digital de Gestão Escolar, Horários e Pautas da EPUSF Maxixe',
  manifest: '/manifest.json',
  icons: {
    icon: '/assets/pwa_icon_192.png',
    apple: '/assets/pwa_icon_192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#172a52',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Hanken+Grotesk:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/style.css" />
        <link rel="stylesheet" href="/premium.css" />
      </head>
      <body className="antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>

        {/* External Libraries */}
        <Script src="https://cdn.jsdelivr.net/npm/apexcharts" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" strategy="afterInteractive" />
        <Script src="https://unpkg.com/html5-qrcode" strategy="afterInteractive" />
        <Script src="/qrcode.js" strategy="afterInteractive" />
        <Script src="/app.js?v=4.2.4-fix1" strategy="lazyOnload" />
      </body>
    </html>
  );
}
