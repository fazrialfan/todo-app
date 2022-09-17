import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('Todo')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'datetime'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime'
  })
  updatedAt: Date;

  @Column({
    type: 'tinytext'
  })
  name: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  completed: boolean;
}
