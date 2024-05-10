import { Test, TestingModule } from '@nestjs/testing';
import { Test01Controller } from './test01.controller';

describe('Test01Controller', () => {
  let controller: Test01Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Test01Controller],
    }).compile();

    controller = module.get<Test01Controller>(Test01Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
