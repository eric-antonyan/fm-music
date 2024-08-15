import { createContext, FC, ReactNode, useContext } from "react";
import { SongData } from "../typings/SongData";
import { request } from "../entities/constants";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

interface FavoritesContextType {
    playlists: any;
    isLoading: boolean;
    isError: boolean;
}

const PlaylistsContext = createContext<FavoritesContextType | undefined>(
    undefined
);

const fetchPlaylists = async (): Promise<SongData[]> => {
    const response = await request.get("/playlists", {
        headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
    });

    if (response.status !== 200) {
        throw new Error("Network response was not ok");
    }

    return response.data;
};

export const PlaylistsProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { data, isLoading, isError } = useQuery<SongData[], Error>({
        queryKey: ["playlistsData"],
        queryFn: fetchPlaylists,
    });

    return (
        <PlaylistsContext.Provider
            value={{ playlists: data, isLoading, isError }}
        >
            {children}
        </PlaylistsContext.Provider>
    );
};

export const usePlaylists = () => {
    const context = useContext(PlaylistsContext);

    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }

    return context;
};

export default PlaylistsProvider;
