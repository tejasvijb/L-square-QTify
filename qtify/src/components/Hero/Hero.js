import React from "react";
import styles from "./Hero.module.css";
import headphoneImg from "../../assets/vibrating-headphone 1.png";

const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.heroContainer}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>
                        100 Thousand Songs, ad-free
                    </h1>
                    <h1 className={styles.title}>
                        Over thousands podcast episodes
                    </h1>
                </div>
                <div className={styles.heroImage}>
                    <img src={headphoneImg} alt="Headphone" />
                </div>
            </div>
        </div>
    );
};

export default Hero;
