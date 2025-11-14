import { create } from "zustand";
interface NavItem {
  label: string;
  href: string;
  id: string;
}

interface NavigationStoreState {
  navItems: NavItem[];
  addNavItem: (item: NavItem) => void;
  removeNavItem: (id: string) => void;
  clearNavItems: () => void;
}
export const useNavigationStore = create<NavigationStoreState>((set, get) => ({
  navItems: [
    { id: "home", label: "Для вас", href: "/" },
    { id: "library", label: "Библиотека", href: "/library" },
    { id: "download", label: "Скачать приложение", href: "/download" },
  ],
  addNavItem: (item: NavItem) => {
    set((state) => ({
      navItems: [...state.navItems, item],
    }));
  },
  removeNavItem: (id: string) => {
    set((state) => ({
      navItems: state.navItems.filter((item) => item.id !== id),
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
}));
