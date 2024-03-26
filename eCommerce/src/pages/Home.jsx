import { Navbar } from '../components/Navbar'
import './Home.css'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <>
      <Navbar />

      <div className="home">
        
        <h2 className="home-title">WELLCOME TO TECH TROVE</h2>
        
        <div className='main-content'>
            <img className='img-electronics' src="/assets/electronics.jpg" alt="electronics" />
            <div className='home-text-btn'>
                <p className="home-text">"Your comfort and safety are our top priorities. 
                Enjoy a secure shopping experience with smooth payment options and reliable delivery."</p>
                <Link to='/shop/products'><button className='shop-now-button'>Shop now</button></Link>
            </div>
            
        </div>
        
      </div>
    </>
   


  )
}