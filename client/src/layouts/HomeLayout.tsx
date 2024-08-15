import { Flex } from "@radix-ui/themes";
import { FC, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { request } from "../entities/constants"; // or your preferred HTTP client
import { AuthProvider, useAuth } from "../contexts/UserProvider"; // adjust the path as necessary
import { UserData } from "../typings/UserData";
import { motion } from "framer-motion";
import { Container } from "@chakra-ui/react";

const HomeLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
    const { auth } = useAuth();
    const [userData, setUserData] = useState<UserData>({
        email: "",
        name: "",
        _id: "",
        __v: 0,
        verified: false,
        description: "",
    });
    const navigate = useNavigate();

    const fetchData = async (): Promise<UserData | {}> => {
        try {
            const response = await request.post("/users/authenticate", {
                access_token: Cookies.get("access_token"),
            });
            return response.data || {}; // Ensure we return an empty object if response data is undefined
        } catch (error: unknown) {
            console.error("Error fetching user data:", error);
            return {}; // Return an empty object on error
        }
    };

    useEffect(() => {
        if (!Cookies.get("access_token")) {
            navigate("/auth");
        }
    }, [navigate]);

    return (
        <Flex>
            <AuthProvider>
                <SideBar auth={auth as UserData} />
                <motion.div
                    style={{
                        width: "100%",
                    }}
                    initial={{
                        y: -10,
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    exit={{
                        y: -10,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.25,
                    }}
                >
                    <Container maxWidth={"1200px"} roundedLeft={"40px"}>
                        {children}
                    </Container>
                </motion.div>
            </AuthProvider>
        </Flex>
    );
};

export default HomeLayout;
