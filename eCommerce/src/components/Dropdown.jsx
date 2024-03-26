
import { ShoppingCart } from './ShoppingCart'
import { useContext } from "react"
import { ShopContext, useShop } from "../contexts/shopContext"



export const Dropdown = ( ) => {

    //använder useContext(ShopContext) för att få tillgång till cart från  ShopContext
    const { cart } = useContext(ShopContext)
  
    const { addToCart, removeOne, removeItem } = useShop()
    

    const addOneToCart = (item) => {
        addToCart(item.product)
    }

    const removeOneFromCart = (item) => {
        removeOne(item.product._id)
    }

    

    const deleteProduct = (item) => {
        removeItem(item.product._id)
    }
 
  return (
   
       <div> 
            
            <div className='dropdown-shopping-cart'>
    
                    {cart.length > 0 ? (
                        cart.map((item, index) => (
                        <div key={index} className='dropdown-item'>
                            <div className="dropdown-item-info">
                                <img src={item.product.images[0]} width='100' alt={item.product.name}/>
                                <p>{item.product.name} - {item.quantity} x {item.product.price}</p>
                            </div>

                            <div className="dropdown-btn">
                                <button className="remove-from-cart" onClick={() => removeOneFromCart(item)}>-</button>
                                <button className="add-to-cart" onClick={() => addOneToCart(item)}>+</button>
                                <button className='delete-product'onClick={() => deleteProduct(item)}><i className="fa-regular fa-trash-can"></i></button>
                            </div>
                        
                        </div>
                        
                            ))
                        
                        ) : (
                            <div className='dropdown-item'>Your shopping cart is empty</div>
                        )}

                       <ShoppingCart />

                        
                    </div>
          
            
       </div>
      
    
  )
}