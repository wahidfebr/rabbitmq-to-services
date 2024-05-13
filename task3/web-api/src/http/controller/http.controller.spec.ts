import { Test, TestingModule } from '@nestjs/testing';
import { HttpController } from './http.controller';
import { ProviderModule } from '../../provider/provider.module';
import { HttpService } from '../service/http.service';

describe('HttpController', () => {
  let controller: HttpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProviderModule],
      controllers: [HttpController],
      providers: [HttpService]
    }).compile();

    controller = module.get<HttpController>(HttpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
