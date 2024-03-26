
import { Link, useParams } from 'react-router-dom'
import './ProductsDetails.css'
import axios from 'axios'

import { useState, useEffect, useContext } from 'react'
import { useShop } from '../contexts/shopContext'

export const ProductsDetails = () => {

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const { _id } = useParams()
  const { addToCart } = useShop()
 
  const [activeImg, setActiveImg] = useState(0)
  const [quantity, setQuantity] = useState(0)

  const increase = () => setQuantity((prev) => prev + 1);
 

  const decrease = () => setQuantity((prev) => Math.max(0, prev -1))

  useEffect(() => {
    setLoading(true)

    const getProduct = async () => {
      const res = await axios.get(`http://localhost:4000/api/products/${_id}`)
      setProduct(res.data)
      setLoading(false)
      console.log('product id:', _id)
    }
    getProduct()
  }, [_id])

  const handleSubmit = () => {
  
    addToCart(product, quantity)
     
    return setQuantity(0)
  }



  return (
    
      <div className='products-details-conatiner'>
      
          { loading && <p>Loanding...</p>}
            {
              product && (
                <div className='products-details'>

                    <div className='detail-info-btn'>

                      <div className='detail-info'>
                        <h2 className='detail-product-name'>{ product.name}</h2> <br />
                        <p className='detail-product-price'>Price:  <span className='price-value'>{product.price}</span></p> <br />
                        <div className='description'>{ product.description }</div> <br />
                      </div>
                      
                      <div className='detail-btn-container'>
                        <button onClick={decrease} className='minus-btn'><i className="fa-solid fa-minus"></i></button>
                        <p className='quantity'>{quantity}</p>
                        <button onClick={increase} className='plus-btn'><i className="fa-solid fa-plus"></i></button>
                        
                        <button onClick={handleSubmit} className='detail-btn'>Add to Cart</button>
                      </div>
                      
                      
                    </div>
                  <div className='detail-img-container'>
                    
                    <img className='show-img' src={product.images[activeImg]} alt={product.name} />
                    <div className='img-container'>
                      {product.images.map((image, index) => (
                        <img className='detail-img' key={index} onClick={() => setActiveImg(index)} src={image} alt={product.name} />
                      ))}
                    </div>
                    
                  </div>

                </div>
                
              )
            }
          
       
         
      </div>
    
  )
}