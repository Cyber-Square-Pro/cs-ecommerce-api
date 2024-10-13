import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { response } from 'express';
import * as mongoose from 'mongoose';
import { Customer } from 'src/auth/schema/customer.schema';
import { CustomerDto } from 'src/dto/customer.dto';
@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name)
        private customerModel:mongoose.Model<Customer>
    ){}


    async fetchCustomers():Promise<Customer[]>{
        const customers = await this.customerModel.find();
        return customers;
    }

    async createAccount(customer: CustomerDto){
        const { email } = customer;
        console.log(email)
        const customerRecord = await this.customerModel.exists({ email });
        console.log(customerRecord)
        if(customerRecord){
            console.log('existtttt  ')
            return  {statusCode: 405, message: "Email Exists"}
        }
        console.log('noooo  ')

        const newCustomer = new this.customerModel(customer);
        newCustomer.save();
        return  {statusCode: 201, message: "Signup Success"}

    }

}
