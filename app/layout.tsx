import type { ReactNode } from 'react';

export const metadata = {
  title: 'Livraria',
  description: 'API Livraria — Next.js (App Router) + Postgres',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: '2rem', lineHeight: 1.5 }}>
        {children}
      </body>
    </html>
  );
}
