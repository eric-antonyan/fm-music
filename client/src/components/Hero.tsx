import { FC, Ref, useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import { Component } from "react";
import { motion } from "framer-motion";
import bg from "../assets/images/hero.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleG from "../assets/images/GoogleG.svg";

interface IHero {
    scrollRef: any;
    authenticated: boolean;
}

const Hero: FC<IHero> = ({ scrollRef, authenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(location);
    }, [location]);

    useEffect(() => {
        console.log("scrollRef value:", scrollRef);
    }, [scrollRef]);

    const goToAuth = () => {
        navigate("/auth", {
            state: {
                previousPath: location.pathname,
            },
        });
        console.log(location);
    };

    // Ensure scrollRef is a valid number
    const validScrollRef = typeof scrollRef === "number" ? scrollRef : 0;

    return (
        <Box
            bgImage={`url(${bg})`}
            bgPosition={`0 ${-validScrollRef * 0.2}px`}
            height="calc(100vh - 72px)"
            bgSize="cover"
            position="relative"
            _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                transitionDuration: "0.5s",
                width: "100%",
                height: "100%",
                bg: "rgba(0, 0, 0, 0.7)",
                zIndex: 1,
            }}
        >
            <Container
                transform={`translateY(${validScrollRef * 0.1}px)`}
                transitionDuration={"0.5s"}
                position={"relative"}
                zIndex={5654}
                maxWidth={"1500px"}
            >
                <div className="p-0 lg:pt-40 flex flex-col items-start fade-in-upwards text-white">
                    <h1 className="text-[2.2rem] font-[700] lg:text-6xl lg:leading-snug text-white lg:text-left text-left lg:-translate-y-4">
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            Listen your favorite
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                        >
                            music with FM Music
                        </motion.p>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                        className="text-[2rem] text-gray-200 lg:text-[1.5rem] lg:leading-snug text-white lg:text-left text-left lg:-translate-y-4 py-3 font-medium"
                    >
                        Your favorite music my favorite music :)
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2 }}
                        className="flex flex-row gap-5 w-full lg:items-start items-start "
                    >
                        {!authenticated ? (
                            <>
                                <button
                                    onClick={goToAuth}
                                    className="flex flex-row items-center justify-center gap-2 p-4 px-12 text-center bg-gradient-to-r from-red-700 to-red-500 text-white rounded-[.4rem] w-[14rem] font-bold shadow-lg transition-all ease-in-out 100 hover:brightness-110 hover:scale-[103%] justify-start"
                                >
                                    Get Started
                                </button>
                                <button className="flex flex-row items-center justify-center gap-2 p-4 text-center bg-white  text-black rounded-[.4rem] font-bold shadow-lg transition-all ease-in-out 100 hover:bg-gray-100 hover:scale-[103%] justify-start">
                                    <img src={GoogleG} alt="" /> Sign Up With
                                    Google
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={goToAuth}
                                className="flex flex-row items-center justify-center gap-2 p-4 px-12 text-center bg-gradient-to-r from-red-700 to-red-500 text-white rounded-[.4rem] w-[14rem] font-bold shadow-lg transition-all ease-in-out 100 hover:brightness-110 hover:scale-[103%] justify-start"
                            >
                                Launch App
                            </button>
                        )}
                    </motion.div>
                </div>
            </Container>
        </Box>
    );
};

export default Hero;
