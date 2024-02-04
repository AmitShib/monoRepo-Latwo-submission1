import { createContext, useContext, useReducer } from 'react';

const DrawerStatusContext = createContext();

const initialState = {
  isDrawerOpen: false,
};

const drawerStatusReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DRAWER':
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    default:
      return state;
  }
};

const DrawerStatusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(drawerStatusReducer, initialState);

  return (
    <DrawerStatusContext.Provider value={{ state, dispatch }}>
      {children}
    </DrawerStatusContext.Provider>
  );
};

const useDrawerStatusContext = () => {
  return useContext(DrawerStatusContext);
};

export { DrawerStatusProvider, useDrawerStatusContext };