import mongoose from 'mongoose';
import { RedisService } from '../redis/redis.service';

export const mongoProviders = [
    {
        provide: 'MONGO_PROTOTYPE',
        useFactory: (redisService: RedisService) => {
            const exec = mongoose.Query.prototype.exec;

            // Set key for use cache
            // Create key and hashkey for save data in cache or get it by this two keys
            // If use cache is true, it will find data with the same key with key and hashkey
            // If it exists, the data that saved in cache will be returned
            mongoose.Query.prototype.cache = function (options: { time: number; key?: string } = { time: 6000 }) {
                const key = JSON.stringify({
                    op: this.op,
                    query: this.getQuery(),
                    options: this.getOptions(),
                    projection: this.projection()
                });

                this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);
                this.useCache = true;
                this.key = this.hashkey + '-' + key;
                this.time = options.time; // Set time for expire cache data

                return this;
            };

            mongoose.Query.prototype.exec = async function () {
                if (!this.useCache) {
                    // eslint-disable-next-line prefer-rest-params
                    return await exec.apply(this, arguments);
                }

                // Get data from cache with hashkey and key
                const cacheValue = await redisService.get(this.key);

                // If data already existed in cache
                // It will map these data to the document type
                if (cacheValue) {
                    console.log('Get data from redis');
                    const doc = cacheValue;
                    return Array.isArray(doc) ? doc.map((d) => new this.model(d)) : new this.model(doc);
                }

                // If data does not exists or it has expired
                // It will get data from mongodb
                // These data will be stored in cache
                // eslint-disable-next-line prefer-rest-params
                const result = await exec.apply(this, arguments);
                redisService.set(this.key, result, { ttl: this.time });
                console.log('Get data from mongodb');

                return result;
            };
        },
        inject: [RedisService]
    }
];
