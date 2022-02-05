import { EntityRepository, Repository } from 'typeorm';
import { CreateMovieDto } from '@dtos/movies.dto';
import { HttpException } from '@exceptions/HttpException';
import { Movie } from '@interfaces/movies.interface';
import { isEmpty } from '@utils/util';
import { MovieEntity } from '@entities/movie.entity';
import { User } from '@/interfaces/users.interface';

@EntityRepository()
class MovieService extends Repository<MovieEntity> {
  public async findAllMovies(): Promise<Movie[]> {
    const movies: Movie[] = await MovieEntity.find({ where: { isVisible: true } });
    return movies;
  }

  public async findMovieById(movieId: number): Promise<Movie> {
    if (isEmpty(movieId)) throw new HttpException(400, "You're not movieId");

    const findMovie: Movie = await MovieEntity.findOne({ where: { id: movieId } });
    if (!findMovie) throw new HttpException(409, "You're not movie");

    return findMovie;
  }

  public async createMovie(movieData: CreateMovieDto, userData: User): Promise<Movie> {
    if (isEmpty(movieData)) throw new HttpException(400, "You're not movieData");

    const findMovie: Movie = await MovieEntity.findOne({ where: { name: movieData.name } });
    if (findMovie) throw new HttpException(409, `You're movie ${movieData.name} already exists`);

    const createMovieData: Movie = await MovieEntity.create({ ...movieData, creatorId: userData.id }).save();

    return createMovieData;
  }

  public async createMovieMock(movieData: CreateMovieDto): Promise<Movie> {
    if (isEmpty(movieData)) throw new HttpException(400, "You're not movieData");

    const findMovie: Movie = await MovieEntity.findOne({ where: { name: movieData.name } });
    if (findMovie) throw new HttpException(409, `You're movie ${movieData.name} already exists`);

    const createMovieData: Movie = await MovieEntity.create(movieData).save();

    return createMovieData;
  }

  public async updateMovie(movieId: number, movieData: CreateMovieDto): Promise<Movie> {
    if (isEmpty(movieData)) throw new HttpException(400, "You're not movieData");

    const findMovie: Movie = await MovieEntity.findOne({ where: { id: movieId } });
    if (!findMovie) throw new HttpException(409, "You're not movie");

    await MovieEntity.update(movieId, movieData);

    const updateMovie: Movie = await MovieEntity.findOne({ where: { id: movieId } });
    return updateMovie;
  }

  public async deleteMovie(movieId: number): Promise<Movie> {
    if (isEmpty(movieId)) throw new HttpException(400, "You're not movieId");

    const findMovie: Movie = await MovieEntity.findOne({ where: { id: movieId } });
    if (!findMovie) throw new HttpException(409, "You're not movie");

    await MovieEntity.delete({ id: movieId });
    return findMovie;
  }
}

export default MovieService;
