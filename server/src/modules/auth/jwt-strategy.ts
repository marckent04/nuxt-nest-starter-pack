import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JWT_CONSTANTS } from "../../constants";
import { JWTPayload } from "./interfaces/JwtPayload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANTS.SECRET,
    });
  }

  async validate(payload: JWTPayload) {
    return { id: payload.id, email: payload.email };
  }
}
