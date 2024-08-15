import { IsMongoId } from "class-validator";

export class AddToPlaylistsDTO {
    @IsMongoId()
    songId: string;
}