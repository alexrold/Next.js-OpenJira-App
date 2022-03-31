import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  sideMenuOpen: boolean;
  isAdingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAdingEntry: false,
  isDragging: false,
};

export const UIProvider: FC = ({ children }) => {
  // state
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  // Methods
  const closeSideMenu = () => dispatch({ type: '[UI] - Close Sidebar' });
  const openSideMenu = () => dispatch({ type: '[UI] - Open Sidebar' });
  const setIsAdingEntry = (isAding: boolean) => dispatch({ type: '[UI] - Set isAdingEntry', payload: isAding });
  const startDragging = () => dispatch({ type: '[UI] - Start Dragging' });
  const endtDragging = () => dispatch({ type: '[UI] - End Dragging' });

  return (
    <UIContext.Provider
      value={{
        // state
        ...state,

        // Methods
        closeSideMenu,
        openSideMenu,

        setIsAdingEntry,

        endtDragging,
        startDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};