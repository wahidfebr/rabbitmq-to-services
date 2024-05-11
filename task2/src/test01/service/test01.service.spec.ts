import { Test, TestingModule } from '@nestjs/testing';
import { Test01Service } from './test01.service';

describe('Test01Service', () => {
  let service: Test01Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Test01Service],
    }).compile();

    service = module.get<Test01Service>(Test01Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
