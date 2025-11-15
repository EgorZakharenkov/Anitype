import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

interface NavigationStore {
  navItems: NavItem[];
  addNavItem: (item: Omit<NavItem, "id">) => void;
  removeNavItem: (id: string) => void;
  clearNavItems: () => void;
  removeNavItemByHref: (href: string) => void;
}

export const useNavigationStore = create<NavigationStore>()(
  persist(
    (set, get) => ({
      navItems: [
        { id: "home", label: "Для вас", href: "/" },
        { id: "library", label: "Библиотека", href: "/library" },
        { id: "download", label: "Скачать приложение", href: "/download" },
      ],

      addNavItem: (item) => {
        const id = `nav-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        set((state) => {
          const filteredItems = state.navItems.filter(
            (navItem) => navItem.href !== item.href,
          );
          return {
            navItems: [...filteredItems, { ...item, id }],
          };
        });
      },

      removeNavItem: (id: string) => {
        set((state) => ({
          navItems: state.navItems.filter((item) => item.id !== id),
        }));
      },

      removeNavItemByHref: (href: string) => {
        set((state) => ({
          navItems: state.navItems.filter((item) => item.href !== href),
        }));
      },

      clearNavItems: () => {
        set({
          navItems: [
            { id: "home", label: "Для вас", href: "/" },
            { id: "library", label: "Библиотека", href: "/library" },
            { id: "download", label: "Скачать приложение", href: "/download" },
          ],
        });
      },
    }),
    {
      name: "navigation-storage",
    },
  ),
);
