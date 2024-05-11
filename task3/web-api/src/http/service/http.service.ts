import { Injectable } from '@nestjs/common';
import { ProviderService } from 'src/provider/service/provider.service';
import { IDataDTO } from '../dto/http.dto';

@Injectable()
export class HttpService {
  constructor(private service: ProviderService) {}

  async store(_props: IDataDTO): Promise<void> {
    await this.service.sendCommand({
      command: 'create',
      data: _props,
    });
  }
}
