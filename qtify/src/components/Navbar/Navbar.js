import React from "react";
import styles from "./Navbar.module.css";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import Button from "../Button/Button";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <Logo />
            </div>
            <div className={styles.searchContainer}>
                <SearchBar />
            </div>
            <div className={styles.buttonContainer}>
                <Button>Give Feedback</Button>
            </div>
        </nav>
    );
};

export default Navbar;
