import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Home } from './pages/Home'
import { Contact } from './pages/Contact'
import { Products } from './pages/Products'

import { Login } from "./pages/Login";
import { BecomeMember } from "./pages/BecomeMember";
import { ProductsDetails } from "./pages/ProductsDetails";
import { AuthLayout } from "./layouts/AuthLayout";
import { ShopLayout } from './layouts/ShopLayout';
import { PrivateLayout } from "./private/PrivateLayout";
import { PrivatePage } from "./private/PrivatePage";
import { CheckOut } from './pages/CheckOut'
import { OrderHistory } from "./pages/OrderHistory";
import { OrderLayout } from './layouts/OrderLayout';




export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/home',
                element: <Home />
            },
            {
                index: true,
                element: <Home />
            },
            {
                path: 'messages',
                element: <Contact />
            },

            {
                path: 'auth',
                element: <AuthLayout />,
                children: [
                    {
                        path: 'login',
                        element: <Login />
                    },
                    {
                        path: 'register',
                        element: <BecomeMember />
                    },
                ]
            },

            {
                path: 'shop',
                element: <ShopLayout />,
                children: [
                    {
                        path: 'checkout',
                        element: <CheckOut />
                    },
                    
                    {
                        path: 'products',
                        element: <Products />
                    },
                    
                    {
                        path: 'productsdetails/:_id',
                        element: <ProductsDetails />
                    }

                    
                ]

            },
            {
                path:'orders',
                element: <OrderLayout />,
                children: [
                    {
                        path: 'orderhistory',
                        element: <OrderHistory />
                    }
                ]
            },
            {
                path: "private",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <PrivatePage />
                    }
                ]
              }
            
            

            
        ]
    }
])