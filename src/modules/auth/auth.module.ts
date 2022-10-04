import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService } from 'src/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('jwtKey'),
                signOptions: { expiresIn: '60m' }
            }),
            inject: [ConfigService]
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
