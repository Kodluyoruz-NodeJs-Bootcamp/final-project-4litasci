import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
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

  @Column()
  creatorId: number = 1;

  @Column()
  isVisible: boolean = false;

  @ManyToMany(() => ActorEntity, (actor: ActorEntity) => actor.movies)
  @JoinTable()
  actors: Actor[];
}
