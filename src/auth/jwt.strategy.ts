import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./dto/jwt-payload.interface";
import { User } from "./user.entity";
import { UsersRespository } from "./users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersRepository: UsersRespository
    ) {
        super({
            secretOrKey: 'topSecret69',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const {username} = payload;
        const user: User = await this.usersRepository.findOneBy({username});
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}