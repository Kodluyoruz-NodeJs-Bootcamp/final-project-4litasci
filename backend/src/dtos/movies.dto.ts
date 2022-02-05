import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  thumbnail: string;
}
