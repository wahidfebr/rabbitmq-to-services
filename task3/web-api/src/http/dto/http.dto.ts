import { ApiProperty } from '@nestjs/swagger';

export class IDataDTO {
  @ApiProperty({
    description: 'nama properties => string',
    required: true,
    default: 'wahid',
  })
  nama: string;

  @ApiProperty({
    description: 'status properties => number',
    required: true,
    default: 1,
  })
  status: number;
}

export interface IMessageDTO {
  message: string;
}
