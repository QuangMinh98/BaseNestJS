import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { UserRepository } from 'src/modules/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService, private readonly userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwtKey')
        });
    }

    async validate(payload: any) {
        const user = await this.userRepository.findById(payload.id);
        if (!user) throw new UnauthorizedException({ errorCode: 401, errorMessage: 'Invalid token' });

        return { id: payload.id, name: payload.name, email: payload.email };
    }
}
