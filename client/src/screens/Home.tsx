import { FC, useRef, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { BarChart } from "@mui/x-charts/BarChart";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useAuth } from "../contexts/UserProvider";
import { UserData } from "../typings/UserData";

const theme = createTheme();

const MotionText = motion(Text);

const Home: FC = () => {
    const { auth } = useAuth();
    const scrollRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.onscroll = () => {
        setScrollY(window.scrollY);
    };
    return (
        <motion.div
            ref={scrollRef}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 1.5,
            }}
        >
            <Header authenticated={auth ? true : false} user={auth as UserData} />
            <Hero scrollRef={scrollY} authenticated={auth ? true : false} />
            <MotionText
                initial={{
                    opacity: 0,
                    y: -10,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                fontSize={"45px"}
                fontWeight={"bold"}
                marginY={"40px"}
                textAlign={"center"}
            >
                Monthly Listeners
            </MotionText>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <motion.div
                    initial={{ y: -20, opacity: 0, x: -20 }}
                    whileInView={{ y: 0, opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <BarChart
                        series={[
                            { data: [35, 44, 24, 34, 28, 180, 178] },
                            { data: [51, 6, 49, 30, 22, 100, 178] },
                            { data: [15, 25, 30, 50, 18, 110, 178] },
                            { data: [100, 50, 15, 25, 14, 90, 178] },
                            { data: [100, 50, 15, 25, 14, 45, 178] },
                            { data: [150, 50, 15, 25, 14, 180, 178] },
                        ]}
                        height={500}
                        xAxis={[
                            {
                                data: [
                                    "April",
                                    "May",
                                    "June",
                                    "Jule",
                                    "September",
                                ],
                                scaleType: "band",
                            },
                        ]}
                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    />
                </motion.div>
            </ThemeProvider>
            {scrollY > 130 ? (
                <button
                    onClick={scrollToTop}
                    className="w-[70px] cursor-pointer h-[70px] bg-red-600 text-white text-[27px] rounded-full fixed right-8 bottom-8"
                >
                    <ExpandLessIcon />
                </button>
            ) : (
                ""
            )}
        </motion.div>
    );
};

export default Home;
