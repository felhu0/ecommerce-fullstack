import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


// ShopContext kan användas för att dela data mellan olika komponenter.
export const ShopContext = createContext()

//useShop-hook är designad för att kapsla in useContext(ShopContext)
export const useShop = () => {
  const context = useContext(ShopContext)

  if(!context) throw new Error('useShop must be inside an ShopContextProvider')

  return context //Slutligen returnerar useShop context-värdena
}


const getTotalPrice = (cart) => {
  let total = 0
  cart.forEach(item => {
    total += item.product.price * item.quantity
  })
  return total
}
const getTotalQuantity = (cart) => {
  let total = 0
  cart.forEach(item => {
    total += item.quantity
  })
  return total
}


const ShopContextProvider = ({ children }) => {
    
    
    const [cart, setCart] = useState([])
    const totalQuantity = getTotalQuantity(cart)
    const totalPrice = getTotalPrice(cart)
    const [products, setProducts] = useState([])

    //Lägg till produkt i kundvagnen
    const addToCart = (product, quantityToAdd = 1) => {
      const itemIndex = cart.findIndex(item => item.product._id === product._id)
      const newCart = [...cart];

      if (itemIndex !== -1) {
        
        newCart[itemIndex].quantity += quantityToAdd;
      } else {
        newCart.push({ product, quantity: quantityToAdd })
      }
      
      setCart(newCart)
      
      
    
    }

    


    const removeOne = (productsId) => {
      const newCart = cart.reduce((acc, item) => {
        if (item.product._id === productsId) {
            const newQuantity = item.quantity - 1;
            if (newQuantity >= 1) {
                acc.push({ ...item, quantity: newQuantity });
            }
        } else {
            acc.push(item);
        }
        return acc;
    }, []);

  
      setCart(newCart)

      
    }

    
    const removeItem = (productsId) => {
      setCart(currentItems => currentItems.filter(item => item.product._id !== productsId))

     
    }

    const clearCart = () => {
      setCart([])
     
   
    } 


    

     useEffect(() => {
      const getProducts = async () => {
        const res = await axios.get('http://localhost:4000/api/products')
        setProducts(res.data)
      }
      getProducts()
     }, []);
    
    
    


    const value = {
        cart,
        totalQuantity,
        totalPrice,
        products, 
        addToCart,
        removeItem,
        removeOne,
        clearCart
       
    }

    return (
      //Använda Provider för att Skicka Värden, dessa värden är tillgängliga för alla barnkomponenter
        <ShopContext.Provider value={value}> 
            { children }
        </ShopContext.Provider>
    )
}

export default ShopContextProvider

