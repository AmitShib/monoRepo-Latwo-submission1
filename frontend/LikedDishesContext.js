import React, { createContext, useState } from 'react';
import { View } from 'react-native'; // Import View to wrap children

const LikedDishesContext = createContext({
  likedDishes: [],
  addLikedDish: () => {},
});

export const LikedDishesProvider = ({ children }) => {
  const [likedDishes, setLikedDishes] = useState([]);

  const addLikedDish = (dish) => {
    setLikedDishes((prevLikedDishes) => [...prevLikedDishes, dish]);
  };

  const removeLikedDish = (dish) => {
    const updatedLikedDishes = likedDishes.filter((item) => item.id !== dish.id);
    setLikedDishes(updatedLikedDishes);
  };

  return (
    <LikedDishesContext.Provider value={{ likedDishes, addLikedDish, removeLikedDish }}>
     {children}
    </LikedDishesContext.Provider>
  );
};

export default LikedDishesContext;
