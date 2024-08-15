import { Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

const ProfileHeaderText: FC<{ children: ReactNode }> = ({ children, ...args }) => {
    return (
        <Text as={"h2"} fontSize={25} marginBottom={"20px"} className="bold-text">{children}</Text>
    )
};

export default ProfileHeaderText