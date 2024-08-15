import { FC, useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { Text } from "@chakra-ui/react";
import { useAuth } from "../contexts/UserProvider";
import { MdCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { LuMoreHorizontal } from "react-icons/lu";
import { DropdownMenu } from "@radix-ui/themes";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import RenderSongs from "../components/RenderSongs";
import { SongData } from "../typings/SongData";
import Player from "../components/Player";
import { useSong } from "../contexts/SongProvider";

interface UserData {
    email: string;
    name: string;
    _id: string;
    __v: number;
}

const LoggedInHome: FC = () => {
    const queryClient = new QueryClient();

    const { isLoading, error, songs } = useSong();
    const [selected, setSelected] = useState(null);

    return (
        <HomeLayout>
            {!isLoading ? (
                !error ? (
                    <div
                        className="relative"
                        style={{ height: "calc(100% - (35px))" }}
                    >
                        <Text
                            fontWeight={"bold"}
                            fontSize={"30px"}
                            marginY={"30px"}
                        >
                            Songs
                        </Text>
                        <RenderSongs
                            initialValue="songs"
                            setSelected={setSelected}
                            songs={songs as unknown as SongData[]}
                        />
                        <Player setSelected={setSelected} selected={selected} />
                    </div>
                ) : (
                    <h1>Error to fetching data!</h1>
                )
            ) : (
                <Loading />
            )}
        </HomeLayout>
    );
};

export default LoggedInHome;
