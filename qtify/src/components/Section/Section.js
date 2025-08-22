import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import Carousel from "../carousel/Carousel";
import Songs from "../songs/Songs";

const Section = ({ type }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    type === "songs"
                        ? `https://qtify-backend-labs.crio.do/songs`
                        : `https://qtify-backend-labs.crio.do/albums/${type}`
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

    const sectionHeaderMap = {
        top: "Top Albums",
        new: "New Albums",
        songs: "Songs",
    };

    return (
        <div className={styles.sectionContainer}>
            {/* We'll add content here later */}
            <div className={styles.sectionHeader}>
                <h2>{sectionHeaderMap[type]}</h2>
                {/* Create a simple text button */}
                {type !== "songs" && (
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={styles.collapseButton}
                    >
                        {collapsed ? "Show All" : "Collapse"}
                    </button>
                )}
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

            {type !== "songs" && data.length > 0 && collapsed && (
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

            {type === "songs" && <Songs data={data} />}
        </div>
    );
};

export default Section;
