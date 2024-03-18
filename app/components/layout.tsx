import { PropsWithChildren } from 'react';
import Header from './header';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <main className="max-w-[800px] mx-auto mt-5 px-3">{children}</main>
    </div>
  );
}
