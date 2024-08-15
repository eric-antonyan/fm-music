import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { FC, ReactNode, useEffect, useState } from "react";
import { SongData } from "../typings/SongData";
import axios from "axios";
import { replaceNewlinesWithBreaksAndRows } from "../helpers/Song";

const SongInformationModal: FC<{ children: ReactNode; selected: SongData }> = ({
    children,
    selected,
}) => {
    const [lyrics, setLyrics] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `https://api.lyrics.ovh/v1/${selected.author}/${selected.name}`
            );
            setLyrics(response.data.lyrics);
            console.log(response.data);
            
        };

        fetchData();
    }, []);
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
            <AlertDialog.Content maxWidth={"450px"}>
                <AlertDialog.Title>{selected.name}</AlertDialog.Title>
                <AlertDialog.Description
                    style={{ fontWeight: "600" }}
                    size={"2"}
                >
                    {
                        lyrics ? replaceNewlinesWithBreaksAndRows(lyrics as unknown as string, selected) : ""
                    }
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default SongInformationModal;
