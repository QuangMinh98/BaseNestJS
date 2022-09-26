import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CrawlerController } from './crawler.controller';
import { HttpModule } from '@nestjs/axios';
import { MongoRepositoryModule } from 'src/repositories/mongo';

@Module({
    imports: [HttpModule, MongoRepositoryModule],
    controllers: [CrawlerController],
    providers: [CrawlerService]
})
export class CrawlerModule {}
