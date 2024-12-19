import { useEffect } from "react";
import Swiper from "swiper";
import { Autoplay, Pagination  } from 'swiper/modules';
import "swiper/swiper-bundle.css";
import { carousel_image1, carousel_image2, carousel_image3, carousel_image4 } from "../../assets";
import assignTypes from "../../constant/PropTypes";
import LazyLoad from 'react-lazyload';

const CarouselImages = ({src, alt}) => {
    return (
         <div className="swiper-slide">
           <LazyLoad height={200} offset={100} once>
            <img src={src} alt={alt} />
          </LazyLoad>
         </div>
     
    )
}

CarouselImages.propTypes = {
    src: assignTypes.string.isRequired,
    alt: assignTypes.string.isRequired
}

const Carousel = () => {

    Swiper.use([Autoplay, Pagination]);

    useEffect(() => {
        const swiper = new Swiper(".swiper-container", {
          slidesPerView: 1,
          loop: true,
          autoplay: {
            delay: 3000, // Set delay for autoplay
            disableOnInteraction:false
          },
        });
    
        return () => {
          swiper.destroy();
        };
      }, []);

      const images = [
        {src: carousel_image1, alt: "carousel_image1"},
        {src: carousel_image2, alt: "carousel_image2"},
        {src: carousel_image3, alt: "carousel_image3"},
        {src: carousel_image4, alt: "carousel_image4"},
      ]

  return (
        <div className="container" id="home">
          <div className="space">space</div>
          <div className="carouselContainer" >
            <div className="swiper-container shadow-lg overflow-hidden auto">
                <div className="swiper-wrapper">
                {images.map((image, index) => {
                    const {src, alt} = image;
                    return (
                        <CarouselImages 
                            key={index}
                            src={src}
                            alt={alt}/>
                    )
                })}
                </div>
            </div>
          </div>
        </div>
  )
}

export default Carousel
