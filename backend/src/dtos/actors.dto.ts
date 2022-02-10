import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateActorDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  description: string;

  @IsUrl()
  thumbnail: string;

  @IsBoolean()
  isVisible: boolean;
}

export class AddMovieActorDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  description: string;

  @IsUrl()
  thumbnail: string;

  @IsBoolean()
  isVisible: boolean;

  @IsNumber()
  movieId: number;
}
