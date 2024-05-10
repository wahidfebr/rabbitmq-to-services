import { Injectable, NotFoundException } from '@nestjs/common';
import { ITest01, ITest01StoreDTO } from '../dto/test01.dto';
import { Test01 as Test01Persistence } from '../entity/test01.entity';

@Injectable()
export class Test01Service {
  async store(_props: ITest01StoreDTO): Promise<ITest01> {
    const created = await Test01Persistence.create(_props);
    return created.toJSON();
  }

  async findById(id: number): Promise<ITest01> {
    const data = await Test01Persistence.findByPk(id);
    if (!data) {
      throw new NotFoundException(`test01 with id ${id} was not found`);
    }
    return data.toJSON();
  }

  async update(_props: ITest01StoreDTO, id: number): Promise<ITest01> {
    const data = await Test01Persistence.findByPk(id);
    if (!data) {
      throw new NotFoundException(`test01 with id ${id} was not found`);
    }
    await data.update(_props);
    return data.toJSON();
  }

  async destroy(id: number): Promise<ITest01> {
    const data = await Test01Persistence.findByPk(id);
    if (!data) {
      throw new NotFoundException(`test01 with id ${id} was not found`);
    }
    await data.destroy();
    return data.toJSON();
  }
}
