import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { appConfig } from 'src/core/config/constants';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(/*private userService: UserService,*/ private config: ConfigService) 
  {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.JWT_SECRET,
    });
  }
  async validate(payload: any) {
    console.log('payload');
    console.log(payload);
    //return await this.userService.getOne(id);
    // retornamos un objeto
    if (typeof payload.role === "string") {
      payload.role = [payload.role];
    }
    return {
      username: payload.username,
      uid: payload.uid,
      company: payload.company,
      role: payload.role
    };
  }
}