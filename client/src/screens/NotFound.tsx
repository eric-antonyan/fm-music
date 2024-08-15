import { FC } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
    return (
        <HomeLayout>
            <Flex
                position={"relative"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"100dvh"}
                direction={"column"}
                gap={"30px"}
            >
                <Text as={"h1"} fontWeight={"700"} className="text-red-600" fontSize={"70px"}>404</Text>
                <Text as={"h2"} className="bold-text" fontSize={"20px"}>
                    Page not found
                </Text>
                <Button as={Link} to={"/home"} colorScheme={"red"}>Go To Home</Button>
                <Text
                    position={"absolute"}
                    bottom={25}
                    left={"50%"}
                    transform={"translate(-50%)"}
                >
                    &copy; Designed by{" "}
                    <span className="bold-text">Antonyan Apps</span>
                </Text>
            </Flex>
        </HomeLayout>
    );
};

export default NotFound;
