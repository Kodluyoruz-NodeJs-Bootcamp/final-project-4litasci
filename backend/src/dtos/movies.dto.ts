import { IsBoolean, IsNotEmpty, IsString, IsUrl } from 'class-validator';

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
