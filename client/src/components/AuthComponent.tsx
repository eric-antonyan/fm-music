import { Container, Text } from "@chakra-ui/react";
import styles from "../styles/Auth.module.css";
import "../styles/Auth.css";
import { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { useAuth } from "../contexts/UserProvider";
import { Navigate, useNavigate } from "react-router-dom";

const AuthComponent: FC = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const navigate = useNavigate()
    const { auth } = useAuth();

    const handleNavigation = () => {
        if (auth) {
            navigate("/home")
            return <Navigate to={"/home"} />
        }
    }

    useEffect(() => {
        handleNavigation()
    }, [])

    const component = useRef<HTMLDivElement>(null);

    const togglePanel = () => {
        setIsRightPanelActive(!isRightPanelActive);
        if (!isRightPanelActive) {
            component.current?.classList.add(styles.rightPanelActive);
        } else {
            component.current?.classList.remove(styles.rightPanelActive);
        }
    };

    return (
        <Container height={"calc(700px)"} mt={50} maxWidth={"1500px"}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.5,
                    delay: 1,
                }}
                ref={component}
                className={styles.main}
            >
                <SignUp component={component} />
                <SignIn />

                <div className={styles.overlayContainer}>
                    <div className={styles.overlay}>
                        <div className={styles.overlayLeft}>
                            <Text
                                as={"h1"}
                                fontSize={"25px"}
                                fontWeight={"bold"}
                            >
                                Welcome Back!
                            </Text>
                            <p>
                                To keep connected with us please login with your
                                personal info
                            </p>
                            <button
                                className={styles.signInButton}
                                onClick={togglePanel}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className={styles.overlayRight}>
                            <Text
                                as={"h1"}
                                fontSize={"25px"}
                                fontWeight={"bold"}
                            >
                                Hello, Friend!
                            </Text>
                            <p>
                                Enter your personal details and start your
                                journey with us
                            </p>
                            <button
                                className={styles.signUpButton}
                                onClick={togglePanel}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Container>
    );
};

export default AuthComponent;
