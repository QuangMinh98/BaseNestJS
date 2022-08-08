export class ConfigService {
    private readonly envConfig: { [key: string]: any } = null;

    constructor() {
        this.envConfig = {
            nodeEnvironment: process.env.NODE_ENV,
            jwtKey: process.env.JWT_KEY,
            connectionString: process.env.CONNECTION_STRING
        };
    }

    get(key: string): any {
        return this.envConfig[key];
    }
}
