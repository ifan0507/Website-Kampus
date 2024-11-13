import React from 'react'
import { Slide } from 'react-slideshow-image';
import Hero_Galeri from './Hero_Galeri'

const SlideShow_Galeri = () => {
    return (
        <Slide
            autoplay={true}
            easing='cubic-out'
        >
            <div className="each-slide-effect">
                <Hero_Galeri
                    backgroundImg='./assets/images/depan1.jpeg'
     
                />
            </div>
            <div className="each-slide-effect">
                <Hero_Galeri
                    backgroundImg="./assets/images/gedung.jpeg"
     
                />
            </div>
            <div className="each-slide-effect">
                <Hero_Galeri
                    backgroundImg='./assets/images/gedung1.jpeg'
         
                />
            </div>
            <div className="each-slide-effect">
                <Hero_Galeri
                    backgroundImg='./assets/images/otomotif2.jpeg'
    
                />
            </div>
        </Slide>
    )
}

export default SlideShow_Galeri