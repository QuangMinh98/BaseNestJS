import { applyDecorators, SetMetadata } from '@nestjs/common';

export const CacheTime = function (time: number) {
    return applyDecorators(SetMetadata('cacheTime', time));
};
