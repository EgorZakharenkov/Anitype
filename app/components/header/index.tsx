"use client";

import styles from "./style.module.scss";
import { Button } from "@/app/components/ui/button";
import { Search } from "@/app/components/search";
import { Ellipse } from "@/app/components/ui/ellipse";
import { ProfileIcon } from "@/app/components/icons/profile";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const links = [
    {
      label: "Для вас",
      path: "/",
    },
    {
      label: "Библиотека",
      path: "/libary",
    },
    {
      label: "Скачать приложение",
      path: "/download",
    },
  ];
  const pathName = usePathname();
  return (
    <header className={styles.header}>
      <div className={styles.links}>
        {links.map(({ label, path }) => (
          <Link key={label} href={path}>
            <Button isActive={pathName === path}>{label}</Button>
          </Link>
        ))}
      </div>
      <div className={styles.wrapper}>
        <Search />
        <Ellipse>
          <ProfileIcon />
        </Ellipse>
      </div>
    </header>
  );
};
