import { Module } from '@nestjs/common';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './services/customer/customer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schema/customer.schema';
import { AccessStrategy, RefreshStrategy } from 'src/strategies';
import { JwtModule } from '@nestjs/jwt';
import { TokenHelper } from './helper/token.helper';
 
@Module({
    imports:[MongooseModule.forFeature([{name:'Customer',schema:CustomerSchema}]), JwtModule.register({}),],
    controllers:[CustomerController],
    providers:[CustomerService, AccessStrategy,RefreshStrategy, TokenHelper]
})
export class AuthModule {}
