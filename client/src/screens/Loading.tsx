import { Flex, Spinner, Text } from "@chakra-ui/react";
import { FC } from "react";

const Loading: FC = () => {
    return (
        <Flex
            position={"relative"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100dvh"}
            direction={"column"}
            gap={"30px"}
        >
            <Spinner size={"xl"} />
            <Text as={"h2"} className="bold-text" fontSize={"20px"}>
                Please wait
            </Text>
            <Text position={"absolute"} bottom={25} left={"50%"} transform={"translate(-50%)"}>&copy; Designed by <span className="bold-text">Antonyan Apps</span></Text>
        </Flex>
    );
};

export default Loading;
