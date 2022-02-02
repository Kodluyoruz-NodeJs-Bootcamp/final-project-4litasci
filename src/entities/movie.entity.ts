import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Movie } from '@interfaces/movies.interface';
import { Actor } from '@interfaces/actors.interface';
import { ActorEntity } from '@entities/actor.entity';

@Entity()
export class MovieEntity extends BaseEntity implements Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  thumbnail: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => ActorEntity, (actor: ActorEntity) => actor.movies)
  actors: Actor[];
}
