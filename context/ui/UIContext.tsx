import { createContext } from 'react';

interface ContextProps {
  sideMenuOpen: boolean;
  isAdingEntry: boolean;
  isDragging: boolean;

  // Methods
  closeSideMenu: () => void;
  openSideMenu: () => void;

  setIsAdingEntry: (isAding: boolean) => void;

  endtDragging: () => void;
  startDragging: () => void
}
export const UIContext = createContext({} as ContextProps);