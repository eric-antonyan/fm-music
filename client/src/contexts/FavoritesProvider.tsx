import { createContext, FC, ReactNode, useContext } from "react";
import { SongData } from "../typings/SongData";
import { request } from "../entities/constants";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

interface FavoritesContextType {
    favorites: SongData[] | undefined;
    isLoading: boolean;
    isError: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
    undefined
);

const fetchFavorites = async (): Promise<SongData[]> => {
    const response = await request.get("/likes", {
        headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
    });

    if (response.status !== 200) {
        throw new Error("Network response was not ok");
    }

    return response.data;
};

export const FavoritesProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { data, isLoading, isError } = useQuery<SongData[], Error>({
        queryKey: ["favoritesData"],
        queryFn: fetchFavorites,
    });

    return (
        <FavoritesContext.Provider
            value={{ favorites: data, isLoading, isError }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);

    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }

    return context;
};

export default FavoritesProvider;
