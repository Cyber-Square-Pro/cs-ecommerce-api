import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from '../services/customer/customer.service';
import { Customer } from '../schema/customer.schema';
import { CustomerDto, CustomerLoginDto } from 'src/dto/customer.dto';

@Controller('customer')
export class CustomerController {

    constructor(private customerService: CustomerService){}

    @Get()   // api will be /customers
    async getCustomerList():Promise<Customer[]>{
        
        return this.customerService.fetchCustomers()
    }

    @Post('signup')
    async customerSignup(@Body() customer: CustomerDto){
        console.log(customer)
       return this.customerService.createAccount(customer)
    }

    @Post('login')
    async customerLogin(@Body() customer: CustomerLoginDto){
       return this.customerService.checkCredentials(customer)
    }
}
