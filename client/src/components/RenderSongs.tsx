import { FC } from "react";
import {
    Box,
    Flex,
    Image,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { MdCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { DropdownMenu } from "@radix-ui/themes";
import { LuMoreHorizontal } from "react-icons/lu";
import { SongData } from "../typings/SongData";
import { formatDistanceToNow } from "date-fns";
import { formatMilliseconds } from "../helpers/Song";
import { useAuth } from "../contexts/UserProvider";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useLikeSong } from "../api";
import Song from "./Song";
import { Link } from "react-router-dom";

interface IRenderSongs {
    songs: SongData[];
    setSelected: (args: any) => void | undefined;
    initialValue: string;
}

const RenderSongs: FC<IRenderSongs> = ({
    songs,
    setSelected,
    initialValue,
}) => {
    const queryClient = useQueryClient();
    const { auth } = useAuth();

    const handleSelect = (song: SongData) => {
        setSelected(song);
    };

    return (
        <>
            <Table>
                <Thead>
                    <Tr>
                        <Th>№</Th>
                        <Th>Song name</Th>
                        <Th>Album</Th>
                        <Th>
                            <MdCalendarMonth />
                        </Th>
                        <Th>
                            <FaRegClock />
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {songs.length >= 1
                        ? songs.map((song: SongData, index: number) => {
                              return (
                                  <Song
                                      initialValue={initialValue}
                                      key={index}
                                      song={song}
                                      index={index}
                                      handleSelect={handleSelect}
                                  />
                              );
                          })
                        : ""}
                </Tbody>
            </Table>
            {songs.length < 1 ? (
                <Text
                    fontWeight={"600"}
                    color={"crimson"}
                    mt={"30px"}
                    textAlign={"center"}
                >
                    {initialValue} not found,{" "}
                    <Link className="text-[#6495ED]" to={"/home"}>
                        Add to favorites
                    </Link>
                </Text>
            ) : (
                ""
            )}
        </>
    );
};

export default RenderSongs;
