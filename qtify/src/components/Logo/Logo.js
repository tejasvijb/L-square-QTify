import React from "react";
import styles from "./Logo.module.css";
import logoImg from "../../assets/logo.png";

const Logo = () => {
    return (
        <div className={styles.logo}>
            <a href="/" title="QTify Home">
                <img src={logoImg} alt="QTify Logo" />
            </a>
        </div>
    );
};

export default Logo;
