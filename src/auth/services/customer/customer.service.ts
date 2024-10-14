import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Customer } from 'src/auth/schema/customer.schema';
import { CustomerDto, CustomerLoginDto } from 'src/dto/customer.dto';

import { TokenHelper } from 'src/auth/helper/token.helper';
@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name)
        private customerModel: mongoose.Model<Customer>,
        private tokenHelper: TokenHelper
    ) { }


    async fetchCustomers(): Promise<Customer[]> {
        const customers = await this.customerModel.find();
        return customers;
    }

    async createAccount(customer: CustomerDto) {

        const { email } = customer;
        console.log(email)
        const customerRecord = await this.customerModel.exists({ email });
        console.log(customerRecord)
        if (customerRecord) {
            return { statusCode: 405, message: "Email Exists" }
        }
        const newCustomer = new this.customerModel(customer);
        newCustomer.save();
        const token = await this.tokenHelper.getTokens(newCustomer.id, newCustomer.email)
        return { statusCode: 201, message: "Signup Success", token: token }

    }

    async checkCredentials(credentials: CustomerLoginDto) {
        const { email, password } = credentials
        const customer = await this.customerModel.findOne({ email }).exec();

        if (customer) {

            if (customer.password == password) {
                console.log(customer.id,'////////////////////', customer.email)
                const token = await this.tokenHelper.getTokens(customer.id, customer.email)
                const hashedRefreshToken = await this.tokenHelper.hashToken(token.refresh_token);
                await this.customerModel.findByIdAndUpdate(
                    customer._id,
                    { refreshToken: hashedRefreshToken },
                    { new: true }
                );
                return {
                    statusCode: 200,
                    token
                };
            }
           
                return{
                    statusCode: 401,
                    message: 'Password Incorrect'
                }
            
        }

        return{
            statusCode: 401,
            message: 'User Not Found'
        }

    }


}
