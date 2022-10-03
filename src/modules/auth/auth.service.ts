import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/common/utils/helpers';
import { UserRepository } from '../user';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userRepository: UserRepository) {}

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) return null;

        const isValid = comparePassword(user.password, password);
        if (!isValid) return null;

        return user;
    }

    generateToken(user: any) {
        const payload = { id: user.id, name: user.name, email: user.email };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }
}
