import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @CreateDateColumn({ type: "timestamp" })
  updated_at: Date;
}
