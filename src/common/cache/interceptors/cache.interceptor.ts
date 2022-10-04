import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpServer,
    Inject,
    Optional
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of, tap } from 'rxjs';
import { RedisService } from 'src/database/redis/redis.service';
import { CACHE_KEY_METADATA, CACHE_TIME_METADATA } from '../constants/cache.constant';

const HTTP_ADAPTER_HOST = 'HttpAdapterHost';
const REFLECTOR = 'Reflector';

export interface HttpAdapterHost<T extends HttpServer = any> {
    httpAdapter: T;
}

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    @Optional()
    @Inject(HTTP_ADAPTER_HOST)
    protected readonly httpAdapterHost: HttpAdapterHost;

    constructor(
        @Inject(REFLECTOR) protected readonly reflector: Reflector,
        private readonly redisService: RedisService
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const cacheKey = this.reflector.get(CACHE_KEY_METADATA, context.getHandler());
        const cacheTime = this.reflector.get(CACHE_TIME_METADATA, context.getHandler()) || 6000;
        const reqUrl = this.trackBy(context);

        // If request method isn't GET
        if (!reqUrl) return next.handle();

        const key = cacheKey + '-' + this.trackBy(context);

        // Get data from cache with key
        const cacheValue = await this.redisService.get(key);

        // If data already existed in cache
        if (cacheValue) {
            console.log('Get data from redis');
            return of(cacheValue);
        }

        return next.handle().pipe(
            tap((response) => {
                console.log('Get data from db');
                this.redisService.set(key, response, { ttl: cacheTime });
            })
        );
    }

    trackBy(context: ExecutionContext): string | undefined {
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;

        if (!isHttpApp) {
            return this.reflector.get(CACHE_KEY_METADATA, context.getHandler());
        }
        const request = context.getArgByIndex(0);
        if (httpAdapter.getRequestMethod(request) !== 'GET') {
            return undefined;
        }
        return httpAdapter.getRequestUrl(request);
    }
}
