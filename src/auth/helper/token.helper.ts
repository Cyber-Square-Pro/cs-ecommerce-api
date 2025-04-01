import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class TokenHelper{

    constructor(
        
        private  jwtService: JwtService
    ){}

    async getTokens(userId: number, email: string){
        console.log(userId,'pp')
        const [at, rt] = await Promise.all([
            
             this.jwtService.signAsync({
                sub: userId,
                email,
            },{
                secret: process.env.JWT_ACCESS_SECRET, 
                expiresIn: 60 * 15
            }),

            this.jwtService.signAsync({
                sub: userId,
                email,
            },{
                secret:process.env.JWT_REFRESH_SECRET, 
                expiresIn: 60 * 60* 24 * 7
            })
        ])

        return {
            accessToken: at,
            refreshToken: rt
            
        }
        
    }


     async hashToken(token: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(token, saltRounds);
      }
    

}