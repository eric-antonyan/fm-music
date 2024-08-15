import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import { Text } from "@chakra-ui/react";
import { request } from "../entities/constants";
import Cookies from "js-cookie";
import Loading from "./Loading";
import { PlaylistData } from "../typings/PlaylistData";
import RenderSongs from "../components/RenderSongs";
import { SongData } from "../typings/SongData";

const Playlist: FC = () => {
    const { identificator } = useParams();
    const [data, setData] = useState<PlaylistData[]>();
    const [selected, setSelected] = useState<SongData>();
    const [playlistInfo, setPlaylistInfo] = useState<PlaylistData>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await request.get(`/playlists/${identificator}`);
            setPlaylistInfo(response.data);

            const allData = await Promise.all(
                response.data.songs.map(async (playlistId: string) => {
                    const data = (
                        await request.get(`/songs`, {
                            headers: {
                                Authorization: `Bearer ${Cookies.get("access_token")}`,
                            },
                        })
                    ).data.find((song: SongData) => song._id === playlistId);
                    return data;
                })
            );
            console.log(allData);

            setData(allData);
        };

        fetchData();
    }, []);
    return (
        <HomeLayout>
            {data ? (
                <>
                    <Text
                        fontWeight={"bold"}
                        fontSize={"30px"}
                        marginY={"30px"}
                    >
                        Playlist: {playlistInfo?.title}
                    </Text>
                    <RenderSongs
                        initialValue="songs"
                        setSelected={setSelected}
                        songs={data as unknown as SongData[]}
                    />
                </>
            ) : (
                <Loading />
            )}
        </HomeLayout>
    );
};

export default Playlist;
