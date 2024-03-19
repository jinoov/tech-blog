import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Link, useLocation } from '@remix-run/react';
import { ReactNode } from 'react';

export default function Header() {
  const location = useLocation();

  const menus: { link: string; label: ReactNode }[] = [
    {
      link: '/cv',
      label: 'CV',
    },
    {
      link: '/',
      label: 'Blog',
    },
  ];

  return (
    <Navbar shouldHideOnScroll isBordered>
      <Link to={'/'} className='relative after:content-[""] after:right-0 after:bottom-0 after:translate-x-[4px] after:translate-y-[-1px] after:w-[10px] after:h-[10px] after:bg-purple-600 after:rounded-full after:absolute after:z-[-1]'>
        <NavbarBrand>
          <h1 className="font-extrabold">Jinoov.dev</h1>
        </NavbarBrand>
      </Link>
      <NavbarContent className="flex gap-4" justify="center">
        {menus.map((menu, i) => (
          <NavbarItem key={i} isActive={menu.link === location.pathname}>
            <Link to={menu.link}>{menu.label}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
