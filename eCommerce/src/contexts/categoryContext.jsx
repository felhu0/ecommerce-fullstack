import { useState } from "react";
import { createContext } from "react"

export const CategoryContext = createContext({

 
    selectedCategory: null,
    setSelectedCategory: () => {}
});

const CategoryContextProvider = ({ children }) => {
  
  const [selectedCategory, setSelectedCategory] = useState(null)  
  

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
        { children }
    </CategoryContext.Provider>

  )
}

export default CategoryContextProvider