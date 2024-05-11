type TConsumerCommand = 'create' | 'update' | 'delete';

interface IConsumerData {
  id?: number;
  nama?: string;
  status?: number;
}

export interface IConsumerMessageDTO {
  command: TConsumerCommand;
  data: IConsumerData;
}
