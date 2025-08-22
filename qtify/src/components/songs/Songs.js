import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";
import Carousel from "../carousel/Carousel";
import Card from "../Card/Card";
import styles from "./Songs.module.css";

const AntTabs = styled(Tabs)({
    borderBottom: "none",
    "& .MuiTabs-indicator": {
        backgroundColor: "#34C94B",
    },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: "none",
        minWidth: 0,
        [theme.breakpoints.up("sm")]: {
            minWidth: 0,
        },
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(1),
        color: "#fff",
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:hover": {
            color: "#fff",
            opacity: 1,
        },
        "&.Mui-selected": {
            color: "#fff",
            fontWeight: theme.typography.fontWeightMedium,
        },
        "&.Mui-focusVisible": {
            backgroundColor: "#d1eaff",
        },
    })
);

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div style={{ marginTop: 16 }}>{children}</div>}
        </div>
    );
}

export default function Songs({ data: allSongs }) {
    const [value, setValue] = React.useState(0);
    const [error, setError] = useState(null);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    `https://qtify-backend-labs.crio.do/genres`
                );
                setGenres(response.data.data || []);
            } catch (err) {
                console.error("Error fetching genres:", err);
                // Use the main error state for simplicity
                if (!error) {
                    setError("Failed to fetch genres data");
                }
            }
        };
        fetchGenres();
    }, [error]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Filter songs by genres if needed when data is available
    const filterSongsByGenre = (genreKey) => {
        if (!genreKey) return allSongs; // Return all songs for the "All" tab
        return allSongs.filter((song) => song.genre?.key === genreKey);
    };

    return (
        <div>
            <>
                <AntTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="song genre tabs"
                >
                    <AntTab label="All" />
                    {genres.map((genre) => (
                        <AntTab key={genre.id} label={genre.label} />
                    ))}
                </AntTabs>

                <CustomTabPanel value={value} index={0}>
                    {allSongs.length > 0 ? (
                        <Carousel
                            data={allSongs}
                            renderComponent={(item) => (
                                <div>
                                    <Card
                                        image={item.image}
                                        follows={item.follows}
                                        likes={item.likes || 0}
                                    />
                                    <h4 className={styles.cardTitle}>
                                        {item.title}
                                    </h4>
                                </div>
                            )}
                        />
                    ) : (
                        <div className={styles.emptyContainer}>
                            No songs available
                        </div>
                    )}
                </CustomTabPanel>

                {genres.map((genre, index) => (
                    <CustomTabPanel
                        key={genre.key}
                        value={value}
                        index={index + 1}
                    >
                        {filterSongsByGenre(genre.key).length > 0 ? (
                            <Carousel
                                data={filterSongsByGenre(genre.key)}
                                renderComponent={(item) => (
                                    <div>
                                        <Card
                                            image={item.image}
                                            likes={item.likes || 0}
                                        />
                                        <h4 className={styles.cardTitle}>
                                            {item.title}
                                        </h4>
                                    </div>
                                )}
                            />
                        ) : (
                            <div className={styles.emptyContainer}>
                                No songs available for this genre
                            </div>
                        )}
                    </CustomTabPanel>
                ))}
            </>
        </div>
    );
}
