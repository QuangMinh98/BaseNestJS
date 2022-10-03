import { applyDecorators, SetMetadata } from '@nestjs/common';

export const CacheKey = function (key: string) {
    return applyDecorators(SetMetadata('cacheKey', key));
};
