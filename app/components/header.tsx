import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Link, useLocation } from '@remix-run/react';
import { ReactNode } from 'react';

export default function Header() {
  const location = useLocation();

  const menus: { link: string; label: ReactNode; aliases?: string[] }[] = [
    {
      link: '/cv',
      label: 'CV',
    },
    {
      link: '/',
      label: 'Blog',
      aliases: ['/post'],
    },
  ];

  return (
    <Navbar shouldHideOnScroll isBordered>
      <Link to={'/'}>
        <NavbarBrand>
          <h1 className="font-extrabold">최진호 기술블로그</h1>
        </NavbarBrand>
      </Link>
      <NavbarContent className="flex gap-4" justify="center">
        {menus.map((menu, i) => (
          <NavbarItem key={i} isActive={menu.link === location.pathname || (menu.aliases ?? []).some((alias) => location.pathname.startsWith(alias))}>
            <Link to={menu.link}>{menu.label}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
