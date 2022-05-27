import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper";

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
            <img src="../static/ghosts.png" alt="NFT1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../static/dinos.png" alt="NFT2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../static/bunnies.png" alt="NFT3" />
          </SwiperSlide>
        </div>
      </Swiper>
    </div> 
  );
}