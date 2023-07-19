import { BaseEntity } from "src/common/base.entity";
import { Entity,Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @Column({ type: "varchar", length: 30, unique: true })
  username: string;

  @Column({ type: "varchar", length: 255 })
  password: string;
}