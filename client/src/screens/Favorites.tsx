import { FC, useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { Text } from "@chakra-ui/react";
import RenderSongs from "../components/RenderSongs";
import { useSong } from "../contexts/SongProvider";
import { SongData } from "../typings/SongData";
import { useFavorites } from "../contexts/FavoritesProvider";
import Loading from "./Loading";
import Player from "../components/Player";

const Favorites: FC = () => {
    const [selected, setSelected] = useState();
    const { favorites, isError, isLoading } = useFavorites();
    console.log(favorites);

    return (
        <HomeLayout>
            {!isLoading ? (
                <>
                    <Text
                        fontWeight={"bold"}
                        fontSize={"30px"}
                        marginY={"30px"}
                    >
                        Favorites
                    </Text>
                    <RenderSongs
                        initialValue="favorites"
                        songs={favorites as unknown as SongData[]}
                        setSelected={setSelected}
                    />
                    <Player setSelected={setSelected} selected={selected as unknown as SongData} />
                </>
            ) : (
                <Loading />
            )}
        </HomeLayout>
    );
};

export default Favorites;
