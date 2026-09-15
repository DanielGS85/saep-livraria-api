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

  // aceita `new Editora({ nome, cidade, email })`; sem argumento (o TypeORM chama
  // `new Editora()` internamente) não quebra.
  constructor(dados?: Partial<Editora>) {
    super();
    if (dados) Object.assign(this, dados);
  }
}
