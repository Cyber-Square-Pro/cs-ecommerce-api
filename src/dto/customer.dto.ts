import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CustomerDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNo: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CustomerLoginDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  }
  
