import React, { createContext, useContext, useState,useEffect  } from 'react';

// Create the context
const OrderedItemsContext = createContext();

// Create a provider component
export const OrderedItemsProvider = ({ children }) => {
  const [hasVisitedTable, setHasVisitedTable] = useState(false); //no clue ask tomer 
  const [orderedItems, setOrderedItems] = useState([]); //selected a dishes from the menu 
  const [checkedItems, setCheckedItems] = useState([]); //selected that dish from orderedItems  
  const [paymentItems, setPaymentItems] = useState([]); //meals that got ordered
  const [itemsToPay, setItemsToPay] = useState([]);//meals that got selected to pay for(like checkedItems but for payment screen)
  const [paidItems, setPaidItems] = useState([]);//meals that got paid for 


  const addCheckedItem = (item) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = [...prevCheckedItems, item];
      return updatedCheckedItems;
    });
  };
  
  useEffect(() => {
    //logItemCounts();
  }, [checkedItems, orderedItems, paymentItems]);


  const logItemCounts = () => {
    console.log("Ordered Items Count:", orderedItems.length, "IDs:", orderedItems.map(item => item.key_id));
    console.log("Checked Items Count:", checkedItems.length, "IDs:", checkedItems.map(item => item.key_id));
    console.log("Payment Items Count:", paymentItems.length, "IDs:", paymentItems.map(item => item.key_id));
  };

  const removeCheckedItem = (itemId) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = prevCheckedItems.filter((item) => item.id !== itemId);
      return updatedCheckedItems;
    });
  };
  
  //select to order (in table)
  const selectItemForCheckout = (itemId, isSelected) => { 
    if (isSelected) {
      // Move from orderedItems to checkedItems
      const itemForCheckout = orderedItems.find(item => item.key_id === itemId);
      
      // Add to checkedItems
      setCheckedItems(prevCheckedItems => [...prevCheckedItems, itemForCheckout]);
  
      // Remove from orderedItems
      //setOrderedItems(prevOrderedItems => prevOrderedItems.filter(item => item.key_id !== itemId));
  
    } else {
      //this blick will add back the item to ordered items commented because so far we want a copy of the item to exist 
      //because if we dont then handling paymentrow becomes a huge pain in the ass ....
      // Move from checkedItems back to orderedItems
      //const itemToDeselect = checkedItems.find(item => item.key_id === itemId);  
      // Add back to orderedItems
      //setOrderedItems(prevOrderedItems => [...prevOrderedItems, itemToDeselect]);
  
      // Remove from checkedItems
      setCheckedItems(prevCheckedItems => prevCheckedItems.filter(item => item.key_id !== itemId));
    }
    //logItemCounts();
  };
  //select item to pay for it (in payment)
  const handleDishSelectForPayment = (item, isSelected) => {
    if (isSelected) {
        setItemsToPay(prevItems => [...prevItems, item]);
    } else {
        setItemsToPay(prevItems => prevItems.filter(i => i.id !== item.id));
    }
  };

  //from table to payment
  const confirmOrderForPayment = () => {
    // Add all checkedItems to paymentItems
    setPaymentItems(prevPaymentItems => [...prevPaymentItems, ...checkedItems]);
    

    const checkedKeys = checkedItems.map(item => item.key_id);
    
    // Remove items from orderedItems that are present in checkedItems
    setOrderedItems(prevOrderedItems => prevOrderedItems.filter(item => !checkedKeys.includes(item.key_id)));
    // Clear checkedItems
    setCheckedItems([]);
    //logItemCounts();
  };

  //from payment to paid
  const handleConfirmPayment = () => {
    setPaidItems(prevPaidItems => [...prevPaidItems, ...itemsToPay]);
    setItemsToPay([]);  // Clear the items awaiting payment after confirmation
  };
  // const generateId = () => {
  //   //const timestamp = new Date().getTime();
  //   //return `${timestamp}-${Math.random().toString(36).substr(2, 9)}`;
  //   return new Date().getTime().toString();
  // };

  const generateId = () => {
    const newId = `${new Date().getTime()}${Math.floor(Math.random() * 1000)}`;
    //console.log(newId);
    return newId;
};


const addOrderedItem = (item) => {
  console.log("provider ----- >addOrderedItem --->users:");
  console.log(item.items.users);
  setOrderedItems((prevOrderedItems) => {
      const newItem = { ...item, key_id: generateId(), users: item.items.users || [] };
      //console.log("Previous Items:", prevOrderedItems);
      //console.log("Adding Item:", newItem);
      // console.log("users in provider");
      // console.log(item.users|| []);
      return [...prevOrderedItems, newItem];
  });    
};


  const doesKeyIdExist = (key_id) => {
    return orderedItems.some(item => item.key_id === key_id) || checkedItems.some(item => item.key_id === key_id);
  };

  const removeOrderedItem = (itemId) => {
    setOrderedItems((prevOrderedItems) =>
      prevOrderedItems.filter((item) => item.id !== itemId)
    );
  };
  
  const getItemById = (key_id) => {
    return orderedItems.find(item => item.key_id === key_id) || checkedItems.find(item => item.key_id === key_id);
  };

  const markTableAsVisited = () => {
    setHasVisitedTable(true);
  };

  const addUserToItem = (itemId, user) => {
    setOrderedItems(prevOrderedItems =>
      prevOrderedItems.map(item =>
        item.key_id === itemId
          ? { ...item, users: [...(item.users || []), user] }
          : item
      )
    );
  };

  const setUserListForItem = (key_id, userList) => {
    setOrderedItems(prevOrderedItems =>
        prevOrderedItems.map(item =>
            item.key_id === key_id
                ? { ...item, users: userList }
                : item
        )
    );
    // console.log(orderedItems);
  };


  const updateUsersForItem = (key_id, newUsers) => {    
    //console.log("new users :: ");
    // console.log(newUsers);
    setOrderedItems(prevOrderedItems =>
      prevOrderedItems.map(item =>
        item.key_id === key_id
          ? { ...item, users: newUsers }
          : item          
      )
    );
  };

  const removeUserFromItem = (itemId, userId) => {
    setOrderedItems(prevOrderedItems =>
        prevOrderedItems.map(item =>
            item.key_id === itemId
                ? { ...item, users: item.users.filter(user => user.id !== userId) }
                : item
        )
    );
  };

////////////////////////////////////////////////////////////// beyond here is paymentitems
  const addPaymentItem = (item) => {
    setPaymentItems((prevPaymentItems) => {
      const newItem = { ...item, users: item.users || [] };
      return [...prevPaymentItems, newItem];
    });
  };

  const removePaymentItem = (itemId) => {
    setPaymentItems((prevPaymentItems) => prevPaymentItems.filter((item) => item.key_id !== itemId));
  };

  const getPaymentItemById = (key_id) => {
    return paymentItems.find(item => item.key_id === key_id);
  };

  const addUserToPaymentItem = (itemId, user) => {
    setPaymentItems(prevPaymentItems =>
      prevPaymentItems.map(item =>
        item.key_id === itemId
          ? { ...item, users: [...(item.users || []), user] }
          : item
      )
    );
  };

  const removeUserFromPaymentItem = (itemId, userId) => {
    setPaymentItems(prevPaymentItems =>
      prevPaymentItems.map(item =>
        item.key_id === itemId
          ? { ...item, users: item.users.filter(user => user.id !== userId) }
          : item
      )
    );
  };

  const updateUserListForPaymentItem = (key_id, userList) => {
    setPaymentItems(prevPaymentItems =>
      prevPaymentItems.map(item =>
        item.key_id === key_id
          ? { ...item, users: userList }
          : item
      )
    );
  };

  const orderedItemsContextValue = {
    orderedItems,
    paymentItems,
    setOrderedItems,
    checkedItems,
    setCheckedItems,
    selectItemForCheckout,
    confirmOrderForPayment,
    addCheckedItem,
    removeCheckedItem,
    addOrderedItem,
    removeOrderedItem,
    hasVisitedTable,
    markTableAsVisited,
    getItemById,    // Adding getItemById to the context
    addUserToItem,
    removeUserFromItem,
    setUserListForItem,
    updateUsersForItem,
    paymentItems,
    addPaymentItem,
    removePaymentItem,
    getPaymentItemById,
    addUserToPaymentItem,
    removeUserFromPaymentItem,
    updateUserListForPaymentItem,
    handleConfirmPayment,
    handleDishSelectForPayment,
  };

  return (
    <OrderedItemsContext.Provider value={orderedItemsContextValue}>
      {children}
    </OrderedItemsContext.Provider>
  );
};

// Create a custom hook
export const useOrderedItems = () => {
  return useContext(OrderedItemsContext);
};

