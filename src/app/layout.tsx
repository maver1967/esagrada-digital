import type { Metadata, Viewport } from 'next';
import './globals.css';
import SessionProvider from '@/presentation/components/SessionProvider';

export const metadata: Metadata = {
  title: 'ESAGRADA · Plataforma Digital',
  description: 'Gestão Escolar, Horários e Pautas da Escola Pré-Universitária Sagrada Família',
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('SW registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
