"use client";

import styles from "./style.module.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigationStore } from "@/stores/navigationStore";
import { Button } from "@/components/ui/Button";
import { Search } from "@/components/shared/Search";
import { Ellipse } from "@/components/ui/Ellipse";
import { ProfileIcon } from "@/components/shared/icons/profile";

export const Header = () => {
  const { navItems } = useNavigationStore();
  const pathName = usePathname();

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
