import { PropsWithChildren } from 'react';
import Header from './header';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="font-serif">
      <Header />
      <main className="max-w-[40rem] mx-auto mt-5 pt-3 pb-6 px-6">{children}</main>
    </div>
  );
}
