import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('editoras')
export class Editora extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  nome!: string;

  @Column('varchar')
  cidade!: string;

  @Column('varchar')
  email!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
  
  constructor(obj?: Partial<Editora>) {
    super();
    if(obj) {
      Object.assign(this, obj);
    }
  }
}
