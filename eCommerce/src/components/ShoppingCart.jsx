import { useContext } from "react"
import { ShopContext } from "../contexts/shopContext"
import { Link } from "react-router-dom"



export const ShoppingCart = () => {
    const { totalPrice } = useContext(ShopContext)
  
    
    return (
        
          <>    
                 <div className="Shopping-cart-checkout">
                           <p>Total Price: { totalPrice } </p>
                            <Link to='/shop/checkout'  className='checkout-button'>Check out</Link>
                </div>

          </>
                
        
  )
}