type TProviderCommand = 'create' | 'update' | 'delete';

interface IProviderData {
  id?: number;
  nama?: string;
  status?: number;
}

export interface IProviderMessageDTO {
  command: TProviderCommand;
  data: IProviderData;
}
