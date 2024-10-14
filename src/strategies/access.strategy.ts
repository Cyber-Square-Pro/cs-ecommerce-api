import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()   
export class AccessStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         
          secretOrKey: process.env.JWT_ACCESS_SECRET,  
          passReqToCallBack:true
        });
      }

      async validate(payload: any) {
        // Payload typically contains decoded user info from the token
        return { userId: payload.sub, email: payload.email };
      }
}