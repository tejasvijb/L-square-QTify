import React from "react";
import styles from "./Card.module.css";
import { Chip } from "@mui/material";
// import albumImage from "../../assets/album-image.png"; // Using the provided album image

const Card = ({ image, follows }) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardImage}>
                <img src={image} alt="Album" />
            </div>
            <div className={styles.cardContent}>
                <Chip
                    label={`${follows} Follows`}
                    variant="outlined"
                    className={styles.chip}
                    size="small"
                />
            </div>
        </div>
    );
};

export default Card;
