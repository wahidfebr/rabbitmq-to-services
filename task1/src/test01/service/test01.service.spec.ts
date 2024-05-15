import { Test, TestingModule } from '@nestjs/testing';
import { Test01Service } from './test01.service';
import { Test01 as Test01Persistence } from '../entity/test01.entity';
import { ITest01 } from '../dto/test01.dto';
import { Model } from 'sequelize';

describe('Test01Service', () => {
  let service: Test01Service;

  const test01Data: ITest01[] = [
    {
      id: 1,
      nama: 'Test01',
      status: 1,
    },
    {
      id: 2,
      nama: 'Test02',
      status: 1,
    },
    {
      id: 3,
      nama: 'Test03',
      status: 1,
    },
    {
      id: 4,
      nama: 'Test04',
      status: 1,
    },
    {
      id: 5,
      nama: 'Test05',
      status: 1,
    },
  ];

  const mockTest01 = test01Data.map((el) => ({
    ...el,
    toJSON: jest.fn().mockReturnValue({ ...el }),
  })) as unknown as Test01Persistence[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Test01Service],
    }).compile();

    service = module.get<Test01Service>(Test01Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findWithPagination', () => {
    it('should return an array of ITest01', async () => {
      const paginationOptions = { limit: 10, page: 1 };
      jest.spyOn(Test01Persistence, 'findAll').mockResolvedValue(mockTest01);

      const result: ITest01[] = test01Data;

      expect(await service.findWithPagination(paginationOptions)).toEqual(
        result,
      );
      expect(Test01Persistence.findAll).toHaveBeenCalledWith({
        limit: paginationOptions.limit,
        offset: (paginationOptions.page - 1) * paginationOptions.limit,
      });
    });
  });

  describe('findById', () => {
    it('should return ITest01 with the same id', async () => {
      const index = 0;
      const id = mockTest01[index].id;
      jest
        .spyOn(Test01Persistence, 'findByPk')
        .mockResolvedValue(mockTest01[index]);

      const result: ITest01 = test01Data[index];

      expect(await service.findById(id)).toEqual(result);
      expect(Test01Persistence.findByPk).toHaveBeenCalledWith(id);
    });
  });
});
