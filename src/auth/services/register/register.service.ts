import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Customer } from 'src/auth/schema/customer.schema';
import { CustomerDto, CustomerLoginDto } from 'src/dto/customer.dto';
import { TokenHelper } from 'src/auth/helper/token.helper';
import { SellerDto } from 'src/dto/seller.dto';
import { Seller } from 'src/auth/schema/seller.schema';

@Injectable()
export class RegisterService {

    constructor(
        @InjectModel(Customer.name)
        private customerModel: mongoose.Model<Customer>,
        private tokenHelper: TokenHelper,
        @InjectModel(Seller.name)
        private sellerModel: mongoose.Model<Seller>,
    ) { }

    async createCustomerAccount(customer: CustomerDto) {

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

    async createSellerAccount(seller: SellerDto) {

        const { email } = seller;
        console.log(email)
        const sellerRecord = await this.sellerModel.exists({ email });
        console.log(sellerRecord)
        if (sellerRecord) {
            return { statusCode: 405, message: "Email Exists" }
        }

        console.log('*************************', seller)
        const newSeller = new this.sellerModel(seller);
        await newSeller.save();
        const token = await this.tokenHelper.getTokens(newSeller.id, newSeller.email)
        return { statusCode: 201, message: "Account Created Succesfully", token: token }

    }

}
