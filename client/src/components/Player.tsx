import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { SongData } from "../typings/SongData";
import {
    Container,
    Flex,
    Image,
    Text,
    Box,
    Slider,
    SliderThumb,
    SliderFilledTrack,
    SliderTrack,
} from "@chakra-ui/react";
import { IoMdRepeat, IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import {
    BsPause,
    BsPauseFill,
    BsPlay,
    BsPlayFill,
    BsRepeat,
    BsShuffle,
} from "react-icons/bs";
import { Progress } from "@radix-ui/themes";
import {
    calculateProgressWithByPercents,
    formatMilliseconds,
    skipNext,
    skipPrev,
} from "../helpers/Song";
import { MdVolumeUp } from "react-icons/md";
import SongInformationModal from "./SongInformationModal";
import { request } from "../entities/constants";
import Cookies from "js-cookie";
import _ from "lodash";

interface IPlayer {
    selected: SongData | null;
    setSelected: (args: any) => void;
}

const Player: FC<IPlayer> = ({ selected, setSelected }) => {
    const [playing, setPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [volume, setVolume] = useState<number>(80);
    const [songs, setSongs] = useState([]);
    const [loop, setLoop] = useState(false);
    const [shuffled, setShuffled] = useState([]);
    const [isShuffled, setIsShuffed] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await request.get("/songs", {
                headers: {
                    Authorization: `Bearer ${Cookies.get("access_token")}`,
                },
            });

            setSongs(response.data);
        };

        fetchData();
    }, []);

    const ref = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.volume = volume / 100;
        }
    }, [ref.current, volume]);

    const handleVolumeChange = (v: number) => {
        setVolume(v);
        if (ref.current) {
            ref.current.volume = v / 100;
        }
    };

    const handlePlaying = () => {
        setPlaying((prevPlaying) => !prevPlaying);

        if (ref.current) {
            if (playing) {
                ref.current.play();
            } else {
                ref.current.pause();
            }
        }
    };

    useEffect(() => {
        if (ref.current) {
            const interval = setInterval(() => {
                setCurrentTime(
                    parseInt(
                        ((ref.current?.currentTime as number) * 1000).toFixed(0)
                    )
                );
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [ref.current]);

    const formattedDuration = formatMilliseconds(selected?.duration as number);

    const handleLoop = () => {
        setLoop(!loop);
        console.log(loop);
    };

    const handleShuffle = () => {
        setIsShuffed(!shuffled)
        setShuffled(_.shuffle(songs));        
    };

    return selected ? (
        <div
            className="fixed bottom-0 left-[16.5rem] h-[100px] border-t-[1px] border-red-600 border-solid"
            style={{ width: "calc(100% - 16.5rem)" }}
        >
            <Container
                maxWidth={"1200px"}
                height={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <SongInformationModal selected={selected}>
                    <Flex alignItems={"center"} gap={"10px"} cursor={"pointer"}>
                        <Image
                            width={"60px"}
                            height={"60px"}
                            objectFit={"cover"}
                            objectPosition={"cover"}
                            src={`/assets/avatars/${selected.name}.png`}
                        />
                        <Flex direction={"column"} gap={"10px"}>
                            <Text fontSize={"12px"} fontWeight={"600"}>
                                {selected.name}
                            </Text>
                            <Text
                                fontSize={"12px"}
                                fontWeight={"600"}
                                color={"#AAAAAA"}
                            >
                                {selected.author}
                            </Text>
                        </Flex>
                    </Flex>
                </SongInformationModal>
                <audio
                    loop={loop}
                    onEnded={() => skipNext(setSelected, songs, selected)}
                    ref={ref}
                    src={`/assets/audios/${selected.name}.mp3`}
                    autoPlay
                ></audio>
                <Flex
                    maxWidth={"681px"}
                    width={"100%"}
                    gap={"8px"}
                    height={"100%"}
                    direction={"column"}
                    justifyContent={"center"}
                >
                    <Flex
                        justifyContent={"center"}
                        gap={"23.5px"}
                        alignItems={"center"}
                    >
                        <BsShuffle
                            onClick={handleShuffle}
                            color={isShuffled ? "#C53030" : "#AAA"}
                        />
                        <IoMdSkipBackward
                            color="#AAA"
                            cursor={"pointer"}
                            onClick={() =>
                                skipPrev(
                                    setSelected,
                                    isShuffled ? shuffled : songs,
                                    selected
                                )
                            }
                        />
                        <Box
                            onClick={handlePlaying}
                            cursor={"pointer"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            width={"40px"}
                            height={"40px"}
                            backgroundColor={playing ? "#AAA" : "red.600"}
                            style={{
                                borderRadius: "50%",
                            }}
                        >
                            {playing ? (
                                <BsPlayFill fontSize={"20px"} color="#fff" />
                            ) : (
                                <BsPauseFill fontSize={"20px"} color="#fff" />
                            )}
                        </Box>
                        <IoMdSkipForward
                            cursor={"pointer"}
                            onClick={() =>
                                skipNext(
                                    setSelected,
                                    isShuffled ? shuffled : songs,
                                    selected
                                )
                            }
                            color="#AAA"
                        />
                        <BsRepeat
                            color={loop ? "#C53030" : "#AAA"}
                            onClick={handleLoop}
                        />
                    </Flex>
                    <Flex alignItems={"center"} gap={"12px"}>
                        <Text color={"#AAA"}>
                            {formatMilliseconds(currentTime)}
                        </Text>
                        <Progress
                            value={calculateProgressWithByPercents(
                                `${currentTime};${ref.current?.duration}`
                            )}
                            color="orange"
                        />
                        <Text color={"#AAA"}>{formattedDuration}</Text>
                    </Flex>
                </Flex>

                <Flex width={"100px"} alignItems={"center"} gap={"10px"}>
                    <MdVolumeUp size={"30px"} />
                    <Slider
                        value={volume}
                        step={10}
                        min={0}
                        max={100}
                        colorScheme="red"
                        onChange={(v) => handleVolumeChange(v)}
                    >
                        <SliderThumb />
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                    </Slider>
                </Flex>
            </Container>
        </div>
    ) : null;
};

export default Player;
