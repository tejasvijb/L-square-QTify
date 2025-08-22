import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import Card from "../Card/Card";

const Section = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://qtify-backend-labs.crio.do/albums/top"
                );
                setData(response.data);
                console.log("Fetched data:", response.data); // Console log the data
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.sectionContainer}>
            {/* We'll add content here later */}
            <div className={styles.sectionHeader}>
                <div>Top Albums</div>
                {/* Create a simple text button */}
                <button className={styles.collapseButton}>Collapse</button>
            </div>

            {/* Create a grid of two rows and 7 cols */}

            {loading && <div>Loading...</div>}
            {!loading && error && <div>{error}</div>}
            {data.length > 0 && (
                <div className={styles.cardGrid}>
                    {data.map((item, index) => (
                        <div>
                            <Card
                                key={index}
                                image={item.image}
                                follows={item.follows}
                            />
                            <h4 className={styles.cardTitle}>{item.title}</h4>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Section;
