import { Box, Flex, GridItem, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { PlaylistData } from "../typings/PlaylistData";
import { motion } from "framer-motion";
import { request } from "../entities/constants";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

interface IPlaylistItem {
    playlist: any;
}

const PlaylistItem: FC<IPlaylistItem> = ({ playlist }) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedSongs = [];
            for (const playlistData of playlist.songs) {
                const response = await request.get(`/songs`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("access_token")}`,
                    },
                });
                const song = response.data.find(
                    (p: { _id: string }) => p._id === playlistData
                );
                if (song) {
                    fetchedSongs.push(song);
                }
            }

            setData({
                songs: fetchedSongs,
                title: playlist.title,
                userId: playlist.userId,
            });
        };

        fetchData();
    }, [playlist.songs, playlist.title, playlist.userId]);

    return data ? (
        <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Link to={`/home/playlists/${playlist._id}`}>
                <GridItem>
                    <Flex direction={"column"} aspectRatio={"1/1"} gap={"30px"}>
                        <Box
                            cursor={"pointer"}
                            background={"#f00"}
                            width={"100%"}
                            aspectRatio={"1/1"}
                            fontWeight={"bold"}
                            fontSize={"32px"}
                            backgroundSize={"cover"}
                            objectPosition={"center"}
                            style={{
                                background: `${
                                    data && data.songs.length > 0
                                        ? `url("/assets/avatars/${data.songs[0].name}.png")`
                                        : "#f00"
                                }`,
                            }}
                        >
                            <Flex
                                alignItems={"center"}
                                justifyContent={"center"}
                                height={"100%"}
                            >
                                {data && data.songs.length <= 0 ? (
                                    <Text as={"span"}>{data.title}</Text>
                                ) : (
                                    ""
                                )}
                            </Flex>
                        </Box>
                        {playlist.songs.length > 0 ? (
                            <Text
                                fontSize={"20px"}
                                fontWeight={"bold"}
                                as={"span"}
                            >
                                {playlist.title}
                            </Text>
                        ) : (
                            ""
                        )}
                    </Flex>
                </GridItem>
            </Link>
        </motion.div>
    ) : (
        "loading"
    );
};

export default PlaylistItem;
