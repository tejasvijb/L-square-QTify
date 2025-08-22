import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styles from "./Carousel.module.css";
import next from "../../assets/next.svg";
import prev from "../../assets/prev.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

function Carousel({ data, renderComponent }) {
    const [swiperInstance, setSwiperInstance] = useState(null);

    const handlePrev = () => {
        if (swiperInstance) {
            swiperInstance.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperInstance) {
            swiperInstance.slideNext();
        }
    };

    return (
        <div className={styles.wrapper}>
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView="auto"
                onSwiper={setSwiperInstance}
                className="mySwiper"
                breakpoints={{
                    640: {
                        spaceBetween: 20,
                    },
                    768: {
                        spaceBetween: 30,
                    },
                    1024: {
                        spaceBetween: 40,
                    },
                }}
            >
                {data &&
                    data.map((item, index) => (
                        <SwiperSlide
                            key={item.id || index}
                            style={{ width: "auto" }}
                        >
                            {renderComponent(item)}
                        </SwiperSlide>
                    ))}
            </Swiper>
            <div className={styles.navigationButtons}>
                <button
                    className={styles.navigationButton}
                    onClick={handlePrev}
                >
                    <img src={prev} alt="Previous" />
                </button>
                <button
                    className={styles.navigationButton}
                    onClick={handleNext}
                >
                    <img src={next} alt="Next" />
                </button>
            </div>
        </div>
    );
}

export default Carousel;
