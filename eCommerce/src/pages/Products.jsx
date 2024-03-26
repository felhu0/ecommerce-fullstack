import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import './Products.css'
import axios from 'axios';

import { useContext } from 'react';
import { CategoryContext } from '../contexts/categoryContext';


 export const Products = () => {



    const [products, setProducts] = useState([]);

    useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get('http://localhost:4000/api/products')
      setProducts(res.data)
     
    }
    getProducts()
    }, []);
    

     
    const { selectedCategory, setSelectedCategory } = useContext(CategoryContext)

    const handleClick = category => {
      setSelectedCategory(category);
      console.log('clicked', selectedCategory)
    }

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;


    

    return (
      <div className="Products">
          <div className="products-img-container">

                {filteredProducts.map((product) => (
                    <div className='products-card' key={product._id}>
                        {product.images && product.images.length > 0 && (
                            <img src={product.images[0]} alt={product.name} />
                        )}
                        
                        <div className=" products-info" >
                          <p className='product-name'>{product.name}</p>

                          
                            <button onClick={() => handleClick(product.category)} className='category-btn' >
                            {product.category}
                          </button>
                        
                          
                       
                          
                          <p className='product-price'>Price: <span className='price-value'>{product.price}</span></p>
                          
                          
                        </div>
                        <Link to={`/shop/productsDetails/${product._id}`}><button className='Products-btn'>Shop now</button></Link>
                        
                    </div>
                 ))}
  
                 
               
             
              
          </div>
          
          
      </div>
    )
  }