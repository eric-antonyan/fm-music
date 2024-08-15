import { ChangeEvent, FC, useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import {
    Box,
    Button,
    Flex,
    Grid,
    Input,
    Text,
} from "@chakra-ui/react";
import PlaylistItem from "../components/PlaylistItem";
import { usePlaylists } from "../contexts/PlaylistsProvider";
import Loading from "./Loading";
import { PlaylistData } from "../typings/PlaylistData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../entities/constants";
import Cookies from "js-cookie";

const Playlists: FC = () => {
    const { isLoading, isError, playlists } = usePlaylists();
    const [title, setTitle] = useState("");

    const queryClient = useQueryClient();

    const newPlaylistMutation = useMutation({
        mutationFn: () => {
            return request.post(
                "/playlists",
                {
                    title,
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("access_token")}`,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["playlistsData"],
            });
            setTitle(""); // Clear the input field after successful mutation
        },
    });

    const handleAdd = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title) {
            newPlaylistMutation.mutate();
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <HomeLayout>
                <Text>Failed to load playlists.</Text>
            </HomeLayout>
        );
    }

    return (
        <HomeLayout>
            <Text fontWeight={"bold"} fontSize={"30px"} marginY={"30px"}>
                Playlists
            </Text>
            <form onSubmit={handleAdd}>
                <Flex marginBottom={"30px"} gap={"20px"}>
                    <Input
                        size={"lg"}
                        colorScheme="red"
                        placeholder="Playlist name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button
                        size={"lg"}
                        type="submit"
                        isDisabled={!title}
                        colorScheme="red"
                    >
                        Add Playlist
                    </Button>
                </Flex>
            </form>
            <Grid templateColumns={"repeat(3, 1fr)"} gap={"50px"}>
                {Array.isArray(playlists) ? (
                    playlists.map((playlist: PlaylistData) => (
                        <PlaylistItem key={playlist._id} playlist={playlist} />
                    ))
                ) : (
                    <Text>No playlists available.</Text>
                )}
            </Grid>
        </HomeLayout>
    );
};

export default Playlists;
