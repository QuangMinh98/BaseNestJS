import { Module } from '@nestjs/common';
import { StreetService } from './street.service';
import { StreetController } from './street.controller';

@Module({
    controllers: [StreetController],
    providers: [StreetService]
})
export class StreetModule {}
