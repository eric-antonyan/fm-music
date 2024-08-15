import { createContext, FC, ReactNode, useContext } from "react";
import { SongData } from "../typings/SongData";
import { request } from "../entities/constants";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

interface SongContextType {
    songs: SongData | undefined;
    isLoading: boolean;
    error: any;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

const fetchSongsData = async (): Promise<SongData> => {
    const response = await request.get("/songs", {
        headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`
        }
    });

    if (!response) {
        throw new Error("Network response was not ok");
    }

    return response.data;
};

export const SongProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { data, isLoading, error } = useQuery<SongData, Error>({
        queryKey: ["songData"],
        queryFn: fetchSongsData,
    });

    return (
        <SongContext.Provider value={{ songs: data, isLoading, error }}>
            {children}
        </SongContext.Provider>
    );
};

export const useSong = () => {
    const context = useContext(SongContext);
    if (context === undefined) {
        throw new Error("useSong must be used within a SongProvider");
    }

    return context;
};

export default SongProvider;
