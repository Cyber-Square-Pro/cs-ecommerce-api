import { Module } from '@nestjs/common';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './services/customer/customer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schema/customer.schema';
 
@Module({
    imports:[MongooseModule.forFeature([{name:'Customer',schema:CustomerSchema}])],
    controllers:[CustomerController],
    providers:[CustomerService]
})
export class AuthModule {}
