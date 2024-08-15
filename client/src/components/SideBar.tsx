import { Text } from "@chakra-ui/react";
import { Button } from "@nextui-org/react";
import { Flex, Separator } from "@radix-ui/themes";
import {
    MdSpaceDashboard,
    MdMusicNote,
    MdManageAccounts,
    MdSupportAgent,
    MdHomeFilled,
} from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar: FC<{ auth: any }> = ({ auth }) => {
    const location = useLocation();

    const prefix = "/home";
    const dashboardPages = [
        {
            title: "Home",
            href: "",
            icon: <MdHomeFilled />,
        },
        {
            title: "Playlists",
            href: "/playlists",
            icon: <MdMusicNote />,
        },
        {
            title: "Favorites",
            href: "/favorites",
            icon: <FaHeart />,
        },
    ];

    return (
        <div className="bg-red-700 w-[16.5rem] h-[100vh] p-[20px] sticky top-0">
            <Flex justify={"between"} direction={"column"} height={"100%"}>
                <div>
                    <Text fontWeight={"bold"} color={"white"} fontSize={"26px"}>
                        FM Music
                    </Text>
                    {dashboardPages.map((page) => {
                        const isFocused =
                            prefix + page.href === location.pathname;

                        return (
                            <Link key={page.title} to={prefix + page.href}>
                                <button
                                    className={`px-4 text-[1.3rem] font-bold w-full transition-transform ease-in-out 200 cursor-pointer flex flex-row items-center mt-3 ${isFocused ? "bg-red-600" : ""} transition duration-150 rounded-full py-2 items-cener`}
                                >
                                    <Flex
                                        className="text-[#fff]"
                                        gap={"10px"}
                                        align={"center"}
                                    >
                                        {page.icon}
                                        <Text
                                            fontWeight={isFocused ? "bold" : ""}
                                        >
                                            {page.title}
                                        </Text>
                                    </Flex>
                                </button>
                            </Link>
                        );
                    })}
                </div>
                <div>
                    <div className="w-[100%] h-[2px] bg-[#fff]"></div>
                    <Link to="/home/profile">
                        <button
                            className={`px-4 text-[1.3rem] font-bold w-full transition-transform ease-in-out 200 cursor-pointer flex flex-row items-center mt-3 transition duration-150 rounded-full py-2 items-cener`}
                        >
                            <Flex
                                className="text-[#fff]"
                                gap={"10px"}
                                align={"center"}
                            >
                                <MdManageAccounts />
                                <Text>Account</Text>
                            </Flex>
                        </button>
                    </Link>
                    <button
                        className={`px-4 text-[1.3rem] font-bold w-full transition-transform ease-in-out 200 cursor-pointer flex flex-row items-center mt-3 transition duration-150 rounded-full py-2 items-cener`}
                    >
                        <Flex
                            className="text-[#fff]"
                            gap={"10px"}
                            align={"center"}
                        >
                            <MdSupportAgent />
                            <Text>Support</Text>
                        </Flex>
                    </button>
                </div>
            </Flex>
        </div>
    );
};

export default SideBar;
