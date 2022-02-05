import { IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  thumbnail: string;
}
