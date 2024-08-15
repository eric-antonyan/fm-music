import { Avatar, DropdownMenu } from "@radix-ui/themes";
import { FC, useEffect } from "react";
import { UserData } from "../typings/UserData";
import { Flex, Text } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onLogout as logout } from "../helpers/User";
import { MdDoorSliding, MdSpaceDashboard } from "react-icons/md";

interface IProfileheader {
    auth: UserData;
}


const ProfileHeader: FC<IProfileheader> = ({ auth }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const onLogout = () => {
        return logout(navigate);
    };
    return (
        <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            paddingY={"20px"}
        >
            <Link to={location.state?.prevPage ? location.state?.prevPage : "/home"}>
                <FaChevronLeft />
            </Link>
            <Text as="h1" fontSize={25} fontWeight={700}>
                Welcome, {auth.name.split(" ")[0]}!
            </Text>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <button>
                        <Avatar
                            radius={"full"}
                            variant="solid"
                            size="4"
                            fallback={auth.name
                                .split(" ")
                                .map((name: string) => name[0] as string)}
                        />
                    </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content variant="soft">
                    <DropdownMenu.Item onClick={() => {
                        navigate("./manage", {
                            state: {
                                prevPage: location.pathname
                            }
                        })
                    }}>
                        <MdSpaceDashboard /> <Text>Manage Account</Text>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item color="red" onClick={onLogout}>
                        <MdDoorSliding /> <Text>Log out</Text>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Flex>
    );
};

export default ProfileHeader;
