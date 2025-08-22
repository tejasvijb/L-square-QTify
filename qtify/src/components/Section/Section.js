import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import Carousel from "../carousel/Carousel";

const Section = ({ type }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://qtify-backend-labs.crio.do/albums/${type}`
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
    }, [type]);

    return (
        <div className={styles.sectionContainer}>
            {/* We'll add content here later */}
            <div className={styles.sectionHeader}>
                {type === "top" ? (
                    <div>Top Albums</div>
                ) : type === "new" ? (
                    <div>New Albums</div>
                ) : null}
                {/* Create a simple text button */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={styles.collapseButton}
                >
                    {collapsed ? "Show All" : "Collapse"}
                </button>
            </div>

            {/* Create a grid of two rows and 7 cols */}

            {loading && <div>Loading...</div>}
            {!loading && error && <div>{error}</div>}
            {data.length > 0 && !collapsed && (
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

            {data.length > 0 && collapsed && (
                <Carousel
                    data={data}
                    renderComponent={(item) => (
                        <div>
                            <Card image={item.image} follows={item.follows} />
                            <h4 className={styles.cardTitle}>{item.title}</h4>
                        </div>
                    )}
                />
            )}
        </div>
    );
};

export default Section;
