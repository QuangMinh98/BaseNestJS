import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: any } = null;

    constructor() {
        this.envConfig = {
            nodeEnvironment: process.env.NODE_ENV,
            jwtKey: process.env.JWT_KEY,
            connectionString: process.env.CONNECTION_STRING,
            redisHost: process.env.REDIS_HOST,
            redisPort: process.env.REDIS_PORT,
            redisPassword: process.env.REDIS_PASSWORD
        };
    }

    get(key: string): any {
        return this.envConfig[key];
    }
}
