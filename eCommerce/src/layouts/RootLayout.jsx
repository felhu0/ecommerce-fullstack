import { Outlet } from "react-router-dom"


import AuthContextProvider from "../contexts/authContext";
import ShopContextProvider from "../contexts/shopContext";
import CategoryContextProvider from "../contexts/categoryContext";
import OrderContextProvider from "../contexts/orderContext";


export const RootLayout = () => {




  
  return (
    <AuthContextProvider >
      <ShopContextProvider >
          <CategoryContextProvider>
              <OrderContextProvider>
    
               <Outlet />
              </OrderContextProvider>
            </CategoryContextProvider>
      </ShopContextProvider>
    </AuthContextProvider>
    
  )
}