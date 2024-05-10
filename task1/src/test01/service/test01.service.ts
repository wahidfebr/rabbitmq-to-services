import { Injectable } from '@nestjs/common';
import { ITest01, ITest01StoreDTO } from '../dto/test01.dto';
import { Test01 as Test01Persistence } from '../entity/test01.entity';

@Injectable()
export class Test01Service {
  async store(_props: ITest01StoreDTO): Promise<ITest01> {
    const created = await Test01Persistence.create(_props);
    return created.toJSON();
  }
}
