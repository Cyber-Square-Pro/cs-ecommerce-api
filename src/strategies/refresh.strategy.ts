import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy,'jwt-refresh'){
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_REFRESH_SECRET,   
        });
      }

      async validate(req: Request,payload: any) {
        const refreshToken = req.get('authorization').replace('Bearer','').trim()
        return {
            ...payload,
            refreshToken
        }
      }
}