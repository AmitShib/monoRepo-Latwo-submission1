// import React, { createContext, useContext, useState } from 'react';

// // Create the context
// const OrderedItemsContext = createContext();

// // Create a provider component
// export const OrderedItemsProvider = ({ children }) => {
//   const [orderedItems, setOrderedItems] = useState([]);
//   const [checkedItems, setCheckedItems] = useState([]);

//   const addCheckedItem = (item) => {
//     setCheckedItems((prevCheckedItems) => [...prevCheckedItems, item]);
//   };

//   const removeCheckedItem = (itemId) => {
//     setCheckedItems((prevCheckedItems) =>
//       prevCheckedItems.filter((item) => item.id !== itemId)
//     );
//   };

//   const orderedItemsContextValue = {
//     orderedItems,
//     setOrderedItems,
//     checkedItems,
//     addCheckedItem,
//     removeCheckedItem,
//   };

//   return (
//     <OrderedItemsContext.Provider value={orderedItemsContextValue}>
//       {children}
//     </OrderedItemsContext.Provider>
//   );
// };

// // Create a custom hook
// export const useOrderedItems = () => {
//   return useContext(OrderedItemsContext);
// };
