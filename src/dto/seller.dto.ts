import { IsString, IsEmail, IsNotEmpty, isEmail } from 'class-validator';

export class SellerDto {

    @IsString()
    @IsNotEmpty()
    sellerName: string;  

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNo: string;

    @IsString()
    @IsNotEmpty()
    address: string;
    
    @IsString()
    @IsNotEmpty()
    bankName:string;

    @IsString()
    @IsNotEmpty()
    accountNo:string;

    @IsString()
    @IsNotEmpty()
    ifscCode:string;

    @IsString()
    @IsNotEmpty()
    gstno:string;

    @IsString()
    @IsNotEmpty()
    password:string;
 
}