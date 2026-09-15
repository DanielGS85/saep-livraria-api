import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('livros')
export class Livro extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  titulo!: string;

  @Column('int')
  paginas!: number;

  @Column('int')
  autor_id!: number;

  @Column('int')
  editora_id!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  constructor(dados?: Partial<Livro>) {
    super();
    if (dados) Object.assign(this, dados);
  }
}
