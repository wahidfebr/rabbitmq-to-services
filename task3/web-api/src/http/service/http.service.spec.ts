import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from './http.service';
import { ProviderModule } from '../../provider/provider.module';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProviderModule],
      providers: [HttpService],
    }).compile();

    service = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
