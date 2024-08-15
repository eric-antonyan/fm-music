import React from "react";
import { SongData } from "../typings/SongData";
import { request } from "../entities/constants";
import Cookies from "js-cookie";

export function formatMilliseconds(milliseconds: number | null) {
    if (typeof milliseconds === "number") {
        const seconds = Math.floor(milliseconds / 1000);

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedTime =
            minutes + ":" + remainingSeconds.toString().padStart(2, "0");

        return formattedTime;
    }
}

export function calculateProgressWithByPercents(string: string): number | null {
    const [currentTimeStr, durationStr] = string.split(";");
    const currentTime = parseFloat(currentTimeStr);
    const duration = parseFloat(durationStr) * 1000;

    if (isNaN(currentTime) || isNaN(duration) || duration <= 0) {
        return null;
    }

    const progress = (currentTime * 100) / duration;
    if (progress < 0 || progress > 100) {
        return null;
    }

    return progress;
}

const firstLatterToUpperCase = (string: string) => {
    let result = "";
    for (let i = 0; i < string.length; i++) {
        if (i < 1) {
            result += string[i].toUpperCase();
        } else {
            result += string[i].toLowerCase();
        }
    }
};

export const replaceNewlinesWithBreaksAndRows = (
    text: string,
    selected: SongData
) => {
    const lines = text.split("\r\n").map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
            {row.split("\n").map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                    {line.replace(
                        `Paroles de la chanson ${selected.name.replace(", ", " ")} par ${firstLatterToUpperCase(selected.author)}`,
                        ""
                    )}
                    <br />
                </React.Fragment>
            ))}
            <div className="row-end" />
        </React.Fragment>
    ));
    return lines;
};

export const skipNext = async (setSelected: (args: any) => void, songs: SongData[], selected: SongData) => {
    const response = await request.get("/songs", {
        headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`
        }
    })
    const prevIndex = response.data.findIndex((song: SongData) => song._id === selected._id)
    console.log(prevIndex);

    const nextIndex = prevIndex + 1
    
    if (nextIndex === songs.length) {
        setSelected(songs[0])
    } else {
        setSelected(songs[nextIndex])
    }
}

export const skipPrev = async (setSelected: (args: any) => void, songs: SongData[], selected: SongData) => {
    const response = await request.get("/songs", {
        headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`
        }
    })
    const nextIndex = response.data.findIndex((song: SongData) => song._id === selected._id)

    const prevIndex = nextIndex - 1
    
    if (nextIndex === 0) {
        setSelected(songs[songs.length - 1])
    } else {
        setSelected(songs[prevIndex])
    }
}