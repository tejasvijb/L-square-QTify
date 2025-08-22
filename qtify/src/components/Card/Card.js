import React from "react";
import styles from "./Card.module.css";
import { Chip } from "@mui/material";
// import albumImage from "../../assets/album-image.png"; // Using the provided album image

// make follows and likes optional

const Card = ({ image, follows = undefined, likes = undefined }) => {
    const displayMetric = follows ? `${follows} Follows` : `${likes} Likes`;

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardImage}>
                <img src={image} alt="song/album" />
            </div>
            <div className={styles.cardContent}>
                <Chip
                    label={displayMetric}
                    variant="outlined"
                    className={styles.chip}
                    size="small"
                />
            </div>
        </div>
    );
};

export default Card;
