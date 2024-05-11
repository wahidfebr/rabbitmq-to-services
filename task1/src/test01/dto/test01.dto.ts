import { ApiProperty } from '@nestjs/swagger';

export interface ITest01 {
  id: number;
  nama: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ITest01StoreDTO {
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

export interface IPaginationOption {
  page: number;
  limit: number;
}
