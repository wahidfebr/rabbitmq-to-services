import { DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';
import { ITest01 } from '../dto/test01.dto';

@Table({
  tableName: 'test01',
  modelName: 'test01',
  underscored: true,
})
export class Test01
  extends Model<InferAttributes<Test01>, InferCreationAttributes<Test01>>
  implements ITest01
{
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: 'VARCHAR(100)',
    allowNull: false,
  })
  nama: string;

  @Column({
    type: DataTypes.SMALLINT,
    allowNull: false,
  })
  status: number;
}
