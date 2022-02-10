import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { Actor } from '@interfaces/actors.interface';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  thumbnail: string;

  @IsBoolean()
  isVisible: boolean;
}

export class AddActorMovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  thumbnail: string;

  @IsBoolean()
  isVisible: boolean;

  @IsNumber()
  actorId: number;
}
