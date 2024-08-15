import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreatePlaylistDTO {
    @IsNotEmpty()
    title: string;
}