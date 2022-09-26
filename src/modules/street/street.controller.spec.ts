import { Test, TestingModule } from '@nestjs/testing';
import { StreetController } from './street.controller';
import { StreetService } from './street.service';

describe('StreetController', () => {
    let controller: StreetController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StreetController],
            providers: [StreetService]
        }).compile();

        controller = module.get<StreetController>(StreetController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
