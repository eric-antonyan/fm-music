import { FC, useState } from "react";
import {
    Box,
    Flex,
    Image,
    Radio,
    RadioGroup,
    Stack,
    Td,
    Text,
    Tr,
} from "@chakra-ui/react";
import { SongData } from "../typings/SongData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLikeSong } from "../api";
import { formatDistanceToNow } from "date-fns";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { AlertDialog, Button } from "@radix-ui/themes";
import { formatMilliseconds } from "../helpers/Song";
import { LuMoreHorizontal } from "react-icons/lu";
import { request } from "../entities/constants";
import { useAuth } from "../contexts/UserProvider";
import { usePlaylists } from "../contexts/PlaylistsProvider";
import { PlaylistData } from "../typings/PlaylistData";

interface SongInterface {
    song: SongData;
    index: number;
    handleSelect: (args: any) => void;
    initialValue: string;
}

const Song: FC<SongInterface> = ({
    song,
    index,
    handleSelect,
    initialValue,
}) => {
    const [liked, setLiked] = useState(song.liked);
    const [playlistsValue, setPlaylistsValue] = useState("");

    const { playlists, isLoading, isError } = usePlaylists();

    const { auth } = useAuth();
    const queryClient = useQueryClient();
    const likeMutation = useMutation({
        mutationFn: () => {
            return request.post("/likes", {
                userId: auth?._id,
                songId: song._id,
            });
        },
        onSuccess: () => {
            setLiked(!liked);
            queryClient.invalidateQueries({
                queryKey: ["favoritesData"],
            });
            queryClient.invalidateQueries({
                queryKey: ["songData"],
            });
        },
        onError: (error) => {
            console.error("Error liking post:", error);
        },
    });

    const handleLike = () => {
        likeMutation.mutate();
    };

    const handleSave = async () => {
        const response = await request.post(`/playlists/${playlistsValue}`, {
            songId: song._id,
        });
    };

    const original = new Date(song.createdAt);
    const formattedDate = formatDistanceToNow(original, {
        addSuffix: true,
    });

    return (
        <Tr key={song._id}>
            <Td>{index + 1}</Td>
            <Td cursor={"pointer"} onClick={() => handleSelect(song)}>
                <Flex gap={"10px"} alignItems={"center"}>
                    <Image
                        width={"60px"}
                        objectFit={"cover"}
                        objectPosition={"center"}
                        height={"60px"}
                        src={`/assets/avatars/${song.name}.png`}
                    />
                    <Flex direction={"column"} gap={"5px"}>
                        <Text as={"p"} fontSize={"14px"} fontWeight={"600"}>
                            {song.name}
                        </Text>
                        <Text as={"p"} color={"silver"} fontSize={"12px"}>
                            {song.author}
                        </Text>
                    </Flex>
                </Flex>
            </Td>
            <Td>
                <Text fontWeight={"600"} fontSize={"14px"}>
                    {song.album}
                </Text>
            </Td>
            <Td>
                <Text fontWeight={"600"} fontSize={"14px"}>
                    {formattedDate}
                </Text>
            </Td>
            <Td>
                <Flex alignItems={"center"} gap={"14px"}>
                    <Box onClick={handleLike}>
                        {liked ? (
                            <AiFillHeart
                                cursor={"pointer"}
                                size={"25px"}
                                className="text-red-600"
                            />
                        ) : (
                            <AiOutlineHeart
                                cursor={"pointer"}
                                size={"25px"}
                                className="text-red-600"
                            />
                        )}
                    </Box>
                    <span>{formatMilliseconds(song.duration)}</span>
                    <AlertDialog.Root>
                        <AlertDialog.Trigger>
                            <button>
                                <LuMoreHorizontal
                                    cursor={"pointer"}
                                    size={"26px"}
                                />
                            </button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content maxWidth="450px">
                            <AlertDialog.Title>
                                Add To Playlists
                            </AlertDialog.Title>
                            <AlertDialog.Description>
                                {!isLoading && !isError && Array.isArray(playlists) ? (
                                    <RadioGroup
                                        onChange={setPlaylistsValue}
                                        value={playlistsValue}
                                    >
                                        <Stack direction="column">
                                            {playlists.map((p: PlaylistData) => (
                                                <Radio key={p._id} value={p._id}>
                                                    {p.title}
                                                </Radio>
                                            ))}
                                        </Stack>
                                    </RadioGroup>
                                ) : (
                                    <Text>Loading playlists...</Text>
                                )}
                            </AlertDialog.Description>
                            <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Cancel onClick={handleSave}>
                                    <Button disabled={!playlistsValue}>
                                        Save
                                    </Button>
                                </AlertDialog.Cancel>
                            </Flex>
                        </AlertDialog.Content>
                    </AlertDialog.Root>
                </Flex>
            </Td>
        </Tr>
    );
};

export default Song;
