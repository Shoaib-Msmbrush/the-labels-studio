import { create } from "zustand";

interface UiStore {
  menuOpen: boolean;
  searchOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  closeAll: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  menuOpen: false,
  searchOpen: false,
  openMenu: () => set({ menuOpen: true, searchOpen: false }),
  closeMenu: () => set({ menuOpen: false }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen, searchOpen: false })),
  openSearch: () => set({ searchOpen: true, menuOpen: false }),
  closeSearch: () => set({ searchOpen: false }),
  toggleSearch: () => set((s) => ({ searchOpen: !s.searchOpen, menuOpen: false })),
  closeAll: () => set({ menuOpen: false, searchOpen: false }),
}));
