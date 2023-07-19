import { Strategy, ExactJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected configService: ConfigService){
    super({
      jwtFromRequest: ExactJwt.fromAuthHeaderAsBearerToken(),
      ignoreExporation:false,
      secretOrKey:configService.get('JWT_SECRET')
    });
  }

  async validate(payload: any) {
    return {userId:payload.sub,username:payload.username};
  }
}