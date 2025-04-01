import { IsString, IsEmail, IsNotEmpty, isEmail } from 'class-validator';

export class loginDto {


    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    userType:string;
 
}