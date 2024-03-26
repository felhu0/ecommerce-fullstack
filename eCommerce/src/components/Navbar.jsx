import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../contexts/authContext'
import { Dropdown } from './Dropdown'
import { useContext, useState } from 'react'
import { ShopContext } from '../contexts/shopContext'
import { CategoryContext } from '../contexts/categoryContext'
import { Category } from './Category'



export const Navbar = () => {

    const { token, logout } = useAuth()  
    const { totalQuantity } = useContext(ShopContext)
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCategory, SetShowCategory] = useState(false);
    // const [showCategoryMenu, SetShowCategoryMenu] = useState(false);
    const { selectedCategory, setSelectedCategory } = useContext(CategoryContext)
  
    const showAllProducts = () => {
        setSelectedCategory(null)
        
    }


    const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  
    }
  return (
    <nav className='navbar-container'>
        
        
        <NavLink to='/home'><img className='logo'src="/assets/logo.png" alt="logo" /></NavLink>
        
        <div className='menu-search-container'>
            <ul>
                <li className="w3-bar-item w3-button"><NavLink to='/home'>Home</NavLink></li>
                
                <li className="w3-bar-item w3-button "> <NavLink to='/shop/products' onClick={showAllProducts} >Products</NavLink></li> 
               
                <li className="w3-bar-item w3-button"><NavLink to='/messages'>Contact</NavLink></li>
                
                <li className="w3-bar-item w3-button category"
                    onClick={() => SetShowCategory(prevState => !prevState)}
                    
                    >
                    <NavLink to='/shop/products'>Category</NavLink>
                    {showCategory && 
                    <Category onCategorySelect={handleCategorySelect} 
                  
                    />}
                </li>
             

            </ul>
        
            <div className='search-container'>
                <input className='search-input' type="text"  placeholder=''/>
                <button className='search-btn'><i className="fa-solid fa-magnifying-glass"></i></button>
            

            </div>

        </div>
        
        <div className='login-shopping-container'>
            <div className='login-btn-container'>
                {token ? (
                     <button onClick={logout} className='login-btn'><i className="fa-solid fa-user"></i>Logout</button>
                ) : (
                    <button className='login-btn'><NavLink to='/auth/login'><i className="fa-solid fa-user"></i>Login</NavLink></button>
                )}
            
                
            </div>


            
            <div className="shopping-cart-container" 
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}>
        
                
            <button className='shopping-cart-btn'>
            
                <i className="fa-solid fa-cart-shopping"></i>
                    Shopping cart
                <p className='cart-counter'>{totalQuantity}</p>
            </button>
          
            {showDropdown && <Dropdown />}
            


            </div>
        
        </div>
        
    </nav>
  )
}