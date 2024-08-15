import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class AddLikeDTO {
    @IsNotEmpty()
    @IsMongoId()
    userId: string;

    @IsNotEmpty()
    @IsMongoId()
    songId: string;
}