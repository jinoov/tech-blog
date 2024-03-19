import { NextUIProvider } from '@nextui-org/react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import './styles/tailwind.css';
import { default as LayoutImpl } from './components/layout';
import { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },

  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
  },
  {
    href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+KR&display=swap',
    rel: 'stylesheet',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          <LayoutImpl>{children}</LayoutImpl>
          <ScrollRestoration />
          <Scripts />
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
