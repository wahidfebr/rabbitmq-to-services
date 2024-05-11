import { Test, TestingModule } from '@nestjs/testing';
import { Test01Controller } from './test01.controller';
import { Test01Service } from '../service/test01.service';

describe('Test01Controller', () => {
  let controller: Test01Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Test01Controller],
      providers: [Test01Service],
    }).compile();

    controller = module.get<Test01Controller>(Test01Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
