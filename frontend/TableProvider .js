import React, { createContext, useContext, useState } from 'react';
import { images } from './Tools/ThemeConsts';

// Create the context
const TableContext = createContext();

// Create a provider component
export const TableProvider = ({ children }) => {
  // Set default values for people
  const defaultPeople = [
    { id: '0', name: "Guest", image: images.avatar_5 },
    { id: '+972544408826', name: "Tomer Yosef", image: images.ido },
    { id: '+972508101181', name: "Daniel Papkov", image: images.pizza },
    // { id: '+972508800374', name: "yoel geva", image: images.avatar_1 },
    { id: '3', name:"Tal Cohen",image:images.avatar_4},
    { id: '4', name:"Nahman Rubin",image:images.avatar_2},
  ];

  // Initialize the people state with defaultPeople
  const [people, setPeople] = useState(defaultPeople);
  
  const addPerson = (person) => {
    setPeople((prevPeople) => [...prevPeople, person]);
    console.log("new ppl");
    console.log(people);
  };

  const removePerson = (personId) => {
    setPeople((prevPeople) =>
      prevPeople.filter((person) => person.id !== personId)
    );
  };

  const tableContextValue = {
    people,
    addPerson,
    removePerson,
  };

  return (
    <TableContext.Provider value={tableContextValue}>
      {children}
    </TableContext.Provider>
  );
};

// Create a custom hook
export const useTable = () => {
  return useContext(TableContext);
};
