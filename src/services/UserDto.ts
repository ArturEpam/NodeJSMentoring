import 'reflect-metadata';
import { IsPositive, Min, Max, IsAlphanumeric, IsUUID } from 'class-validator';

export class UserDto {
    @IsUUID()
    id: string;
    
    login: string;

    @IsAlphanumeric()
    password: string;

    role: string;

    @Min(4)
    @Max(130)
    age: number;

    groups: string[];
}