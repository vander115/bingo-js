import { Header } from '@/containers/Header';
import { GlobalStyle } from '@/styles/global';
import { Inter } from '@next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="pt-br">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <head />
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
      <GlobalStyle />
    </>
  );
}
