import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Movie } from '@interfaces/movies.interface';
import { Actor } from '@interfaces/actors.interface';
import { MovieEntity } from '@entities/movie.entity';

@Entity()
export class ActorEntity extends BaseEntity implements Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  fullName: string;

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

  @ManyToMany(() => MovieEntity, (movie: MovieEntity) => movie.actors)
  movies: Movie[];
}
