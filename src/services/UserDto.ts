import 'reflect-metadata';
import { IsPositive, Min, Max, IsAlphanumeric } from 'class-validator';

export class UserDto {
    @IsPositive()
    id: number;
    
    login: string;

    @IsAlphanumeric()
    password: string;

    role: string;

    @Min(4)
    @Max(130)
    age: number;
}