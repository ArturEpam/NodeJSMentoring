import { IsPositive, IsAlpha, IsBoolean, Min, Max } from "class-validator";

export class User {
    @IsPositive()
    id: number;
    
    login: string;

    @IsAlpha()
    password: string;

    role: string;

    @Min(4)
    @Max(130)
    age: number;
    
    isDeleted?: boolean;    
}