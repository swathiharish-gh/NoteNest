// home.jsx
import React from 'react'
import HomeComponent from "../components/HomeComponent"
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className='h-heightWithoutNavbar'>
      <HomeComponent/>
      <Footer />
    </div>
  )
}

export default Home
