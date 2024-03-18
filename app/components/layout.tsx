import { PropsWithChildren } from 'react';
import Header from './header';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <main className="max-w-[800px] mx-auto mt-5 py-3 px-4">{children}</main>
    </div>
  );
}
