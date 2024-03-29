"use client";

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './fleetspec.css';


import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const FleetSpecSlider = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={300} height={200} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={200} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={200} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={200} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={200} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={200} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={400} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={400} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={400} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={400} />
                </SwiperSlide>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={200} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={200} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={400} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={400} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={400} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={400} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={400} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={400} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={400} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/images/Bombadier Global 8000-1.png" width={600} height={400} />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
export default FleetSpecSlider;