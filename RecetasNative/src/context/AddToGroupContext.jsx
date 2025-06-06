import React, { createContext, useContext, useState } from 'react';

const AddToGroupContext = createContext();

export function AddToGroupProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [recipeId, setRecipeId] = useState(null);

  console.log('AddToGroupProvider rendered with isVisible:', isVisible, 'and recipeId:', recipeId);
  

  const openModal = (id) => {
    setRecipeId(id);
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    setRecipeId(null);
  };

  return (
    <AddToGroupContext.Provider value={{ isVisible, recipeId, openModal, closeModal }}>
      {children}
    </AddToGroupContext.Provider>
  );
}

export const useAddToGroup = () => useContext(AddToGroupContext);