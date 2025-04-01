import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Customer } from 'src/auth/schema/customer.schema';
import { CustomerDto } from 'src/dto/customer.dto';
import { Seller } from 'src/auth/schema/seller.schema';
import { TokenHelper } from 'src/auth/helper/token.helper';
import { loginDto } from 'src/dto/login.dto';

@Injectable()
export class LoginService {

     constructor(
            @InjectModel(Customer.name)
            private customerModel: mongoose.Model<Customer>,
            private tokenHelper: TokenHelper,
            @InjectModel(Seller.name)
            private sellerModel: mongoose.Model<Seller>,
        ) { }
    

    async validateUser(credentials: loginDto) {
    
            const { email, password, userType } = credentials;
            console.log(email,userType)
            if(userType === 'seller'){
                const sellerRecord = await this.sellerModel.findOne({ email, password });
                if (sellerRecord) {
                    const token = await this.tokenHelper.getTokens(sellerRecord.id, sellerRecord.email)
                    return { statusCode: 200, message: "Login Success", token: token, userType: userType, currentUser: sellerRecord.sellerName }
                }
                console.log('not exists')
                return { statusCode: 404, message: "Username or Password Incorrect" }
            }    
        }
   
}
