import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper";
import Image from "next/image";
import ghosts_img from '../static/ghosts.png'
import dinos_img from '../static/dinos.png'
import bunnies_img from '../static/bunnies.png'

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import 'swiper/css/navigation';

export default function SwipSlider() {
  return (     
    <div className="container slider-container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        navigation
        autoplay={{ delay: 1400, disableOnInteraction: false }}

        modules={[EffectCoverflow, Navigation, Autoplay]}
        className="mySwiper"
      >
        <div className="px-20">
          <SwiperSlide>
            <Image
              src={ghosts_img}
              alt="NFT1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={dinos_img}
              alt="NFT2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={bunnies_img}
              alt="NFT3"
            />
          </SwiperSlide>
        </div>
      </Swiper>
    </div> 
  );
}