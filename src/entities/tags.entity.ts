import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags', { schema: 'workwise_blog' })
export class TagsEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;
}
