
import { useContext, useEffect, useState } from 'react'
import './CheckOut.css'
import { ShopContext, useShop } from '../contexts/shopContext'
import { OrderContext } from '../contexts/orderContext'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/authContext'




export const CheckOut = () => {
  const { cart, totalPrice } = useContext(ShopContext)
  const { handleConfirmPurchase, createOrder, orderData } = useContext(OrderContext)
  const { token } = useContext(AuthContext)
  const { addToCart, removeOne, removeItem, clearCart } = useShop()

    const addOneToCart = (item) => {
        addToCart(item.product)
    }

    const removeOneFromCart = (item) => {
        removeOne(item.product._id)
    }

    

    const deleteProduct = (item) => {
        removeItem(item.product._id)
    }
    
    //Uppdaterad handleConfirmPurchase
    const onConfirmPurchase = async () => {
      
      try {
        const result = await handleConfirmPurchase()
        if(result && result.success) {
          
          clearCart(); // Töm varukorg
          console.log(result.message);
          
        } else if(result && result.error) {
          console.error(result.error);
        }
      } catch (error) {
        console.log('Error during purchase confirmation:', error)
      }
     
    }
   

    return (
      <div className="checkout">
          
          <h2 className="checkout-title">Your Cart Items</h2>
          <div className='checkout-item-container'>
              {cart.length < 1 && (
                  <p className='cart-empty'>
                    Your cart is empty
                  </p>
                )}
                <div className=''>
                  {cart.map((item, index) => (
                        <div key={index} className='checkout-item'>
                            <div className='checkout-img-container'>
                          
                              <img className='checkout-img' src={item.product.images[0]} alt={item.product.name} />
                              <div className='checkout-info'>
                                <p>{item.product.name}</p>
                                <p>{item.quantity} x {item.product.price}</p>
                                
                              </div>
                              
                                <div className="item-actions">
                                    <button className="remove-from-cart" onClick={() => removeOneFromCart(item)}>-</button>
                                    <button className="add-to-cart" onClick={() => addOneToCart(item)}>+</button>
                                    <button className='delete-product'onClick={() => deleteProduct(item)}><i className="fa-regular fa-trash-can"></i></button>
                                </div>
                              
                              
                          </div>
                          
                        </div>
                        
                      ))}

                    <div className='item-checkout'>
                        <p className='checkout-total-price'>Total Price: { totalPrice } </p>
                        <div className='checkout-btn-container'>
                            <button className='clear-cart' onClick={clearCart}>Clear Cart</button>

                              <div className='checkout-purchase'>
                                  <button className='checkout-button' onClick={onConfirmPurchase}>Confirm Purchase</button>
                                  {!token && <Link to='/Auth/login'>Login to Purchase</Link>}
                              </div>
                            
                          
                        </div>
                        { token && <Link to='/orders/orderhistory'>Order History</Link>}
                     
                       
                    </div>  
                    
                </div>
                
                  
          </div>
          

         
      
      </div>
     
    )
  }