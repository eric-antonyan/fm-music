import { useAuth } from "./contexts/UserProvider";
import { request } from "./entities/constants";
import { SongData } from "./typings/SongData";

export const useLikeSong = (songId: string) => {
    const { auth } = useAuth();

    const likeSong = async (id: string) => {
        const response = await request.post("/likes", {
            userId: auth?._id,
            songId: id,
        });
        return response.data;
    };

    return { likeSong };
};
