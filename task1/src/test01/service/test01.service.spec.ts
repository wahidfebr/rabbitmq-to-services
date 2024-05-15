import { Test, TestingModule } from '@nestjs/testing';
import { Test01Service } from './test01.service';
import { Test01 as Test01Persistence } from '../entity/test01.entity';
import { ITest01, ITest01StoreDTO } from '../dto/test01.dto';
import { NotFoundException } from '@nestjs/common';

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

    it('should throw NotFoundException if the entity is not found', async () => {
      jest.spyOn(Test01Persistence, 'findByPk').mockResolvedValue(null);
      await expect(service.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('store', () => {
    it('should create new ITest01 then return the same ITest01 with auto increment id', async () => {
      const newData: ITest01StoreDTO = {
        nama: 'New Test',
        status: 1,
      };
      const result: ITest01 = { ...newData, id: test01Data.at(-1).id + 1 };

      jest.spyOn(Test01Persistence, 'create').mockResolvedValue({
        ...newData,
        id: result.id,
        toJSON: jest.fn().mockReturnValue(result),
      } as unknown as Test01Persistence);

      expect(await service.store(newData)).toEqual(result);
      expect(Test01Persistence.create).toHaveBeenCalledWith(newData);
    });
  });

  describe('update', () => {
    it('should update ITest01 then return the updated ITest01', async () => {
      const updateData: ITest01StoreDTO = {
        nama: 'Updated Test01',
        status: 200,
      };
      const id = 1;
      const result: ITest01 = { id: id, ...updateData };

      const mockUpdateData = {
        id: id,
        nama: 'Test01',
        status: 1,
        toJSON: jest.fn().mockReturnValue(result),
        update: jest
          .fn()
          .mockImplementation(
            (newData: ITest01StoreDTO): Promise<Test01Persistence> => {
              Object.assign(mockUpdateData, newData);
              return Promise.resolve(mockUpdateData);
            },
          ),
      } as unknown as Test01Persistence;

      jest
        .spyOn(Test01Persistence, 'findByPk')
        .mockResolvedValue(mockUpdateData);

      expect(await service.update(updateData, id)).toEqual(result);
      expect(Test01Persistence.findByPk).toHaveBeenCalledWith(id);
      expect(mockUpdateData.update).toHaveBeenCalledWith(updateData);
      expect(mockUpdateData.nama).toBe('Updated Test01');
      expect(mockUpdateData.status).toBe(200);
      expect(mockUpdateData.toJSON).toHaveBeenCalled();
    });

    it('should throw NotFoundException if the entity is not found', async () => {
      jest.spyOn(Test01Persistence, 'findByPk').mockResolvedValue(null);
      await expect(
        service.update({ nama: 'Updated Test01', status: 200 }, 1),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('destroy', () => {
    it('should delete ITest01 then return the deleted ITest01', async () => {
      const index = 1;
      const deletedData = {
        ...mockTest01[index],
        destroy: jest.fn(),
      } as unknown as Test01Persistence;

      jest.spyOn(Test01Persistence, 'findByPk').mockResolvedValue(deletedData);

      const result: ITest01 = test01Data[index];
      expect(await service.destroy(deletedData.id)).toEqual(result);
      expect(Test01Persistence.findByPk).toHaveBeenCalledWith(deletedData.id);
      expect(deletedData.destroy).toHaveBeenCalled();
      expect(deletedData.toJSON).toHaveBeenCalled();
    });

    it('should throw NotFoundException if the entity is not found', async () => {
      jest.spyOn(Test01Persistence, 'findByPk').mockResolvedValue(null);
      await expect(service.destroy(1)).rejects.toThrow(NotFoundException);
    });
  });
});
