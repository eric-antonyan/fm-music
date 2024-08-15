import { Avatar, Container, Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import Background from "../ui/Background";
import { colors } from "../entities/color";

// @ts-ignore
import logo from "../assets/images/logo.png";
import { Button as NextButton } from "@nextui-org/react";
import Button from "../ui/Button";
import SolidButton from "../ui/SolidButton";
import {
    FaChevronLeft,
    FaDoorOpen,
    FaHeart,
    FaMusic,
    FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeaderInterface } from "../interfaces/HeaderComponent.interface";
import { DropdownMenu } from "@radix-ui/themes";

const MotionFlex = motion(Flex);

const MotionAvatar = motion(Avatar);

const Header: FC<HeaderInterface> = ({ authenticated, user }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        navigate(location?.state.previousPath, {
            state: {
                prevoiusPath: location.pathname,
            },
        });
    };

    return (
        <Background
            initial={{
                opacity: 0,
                y: -10,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                ease: "easeIn",
                duration: 0.5,
            }}
            color={colors.primary}
            width={"100%"}
            height={"72px"}
        >
            <Container maxWidth={"1500px"} height={"100%"}>
                <Flex justifyContent={"space-between"} height={"100%"}>
                    <MotionFlex
                        initial={{
                            opacity: 0,
                            x: -60,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 1,
                        }}
                        alignItems={"center"}
                        height={"100%"}
                        gap={"60px"}
                    >
                        {location.state ? (
                            location.pathname !==
                            location.state.previousPath ? (
                                <button onClick={handleBack}>
                                    <FaChevronLeft color="white" />
                                </button>
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )}
                        <Flex alignItems={"center"} gap={"20px"}>
                            <Image width={"40px"} src={logo} />
                            <Text
                                as={"h2"}
                                color={"#fff"}
                                fontSize={"27px"}
                                fontWeight={"bold"}
                            >
                                FM Music
                            </Text>
                        </Flex>
                        <Button>About US</Button>
                        <Button>Contact US</Button>
                    </MotionFlex>
                    <Flex
                        gap={"20px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        {!authenticated ? (
                            <>
                                <Button>Sign In</Button>
                                <SolidButton>Get Started</SolidButton>
                            </>
                        ) : (
                            <Flex
                                justifyContent={"center"}
                                alignItems="center"
                                gap={"30px"}
                            >
                                <NextButton as={Link} to="/home" variant="ghost" color="warning">Dashboard</NextButton>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            </Container>
        </Background>
    );
};

export default Header;
