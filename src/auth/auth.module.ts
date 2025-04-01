import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schema/customer.schema';
import { AccessStrategy, RefreshStrategy } from 'src/strategies';
import { JwtModule } from '@nestjs/jwt';
import { TokenHelper } from './helper/token.helper';
 import { ConfigModule, ConfigService } from '@nestjs/config';
import { SellerSchema } from './schema/seller.schema';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './services/register/register.service';
import { LoginService } from './services/login/login.service';

@Module({
    imports:[MongooseModule.forFeature([{name:'Customer',schema:CustomerSchema}, {name:'Seller',schema:SellerSchema}]),  
    
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'), // Load from .env
          signOptions: { expiresIn: '1h' },
        }),
      }),
    ],
    controllers:[LoginController, RegisterController],
    providers:[AccessStrategy,RefreshStrategy, TokenHelper, RegisterService, LoginService]
})
export class AuthModule {}
