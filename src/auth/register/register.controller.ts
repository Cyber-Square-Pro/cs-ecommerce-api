import { Body, Controller, Post } from '@nestjs/common';
import { CustomerDto, CustomerLoginDto } from 'src/dto/customer.dto';
import { SellerDto } from 'src/dto/seller.dto';
import { RegisterService } from '../services/register/register.service';
import { LoginService } from '../services/login/login.service';

@Controller('register')
export class RegisterController {

    constructor(private registerService: RegisterService){}

    @Post('customer')
    async customerSignup(@Body() customer: CustomerDto) {
        console.log(customer)
        return this.registerService.createCustomerAccount(customer)
    }

    @Post('seller')
    async sellerSignup(@Body() seller: SellerDto){
        console.log('sellerrrrrrrrr')
        console.log(seller)
       return this.registerService.createSellerAccount(seller)
    }
}
