"use client";

import styles from "./style.module.scss";
import { Search } from "@/components/search";
import { Ellipse } from "@/components/ui/ellipse";
import { ProfileIcon } from "@/components/icons/profile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useNavigationStore } from "@/stores/navigationStore";
import { useEffect } from "react";

export const Header = () => {
  const { navItems, clearNavItems } = useNavigationStore();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === "/") {
      clearNavItems();
    }
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.links}>
        {navItems.map(({ label, href, id }) => (
          <Link key={id} href={href}>
            <Button isActive={pathName === href}>{label}</Button>
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
