import React from 'react'
import { useEffect } from 'react'
import Carousel from '../component/Carousel/Carousel'
import Footer from '../component/Footer/Footer'
import Maps from '../component/Maps/Maps'
import './Home.css'
import HomeMain from './HomeMain'



function Home() {
    return (
        <div className="container-fluid p-0">
            <Carousel />
            <HomeMain />
            <div className="map-box">
                <Maps />
            </div>
            <Footer />
        </div>
    )
}

export default Home;


