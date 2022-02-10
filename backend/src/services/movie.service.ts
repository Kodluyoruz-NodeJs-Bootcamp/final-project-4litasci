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

  public async findMyAllMovies(userData: User): Promise<Movie[]> {
    const movies: Movie[] = await MovieEntity.find({ where: { creatorId: userData.id } });
    return movies;
  }

  public async findMovieById(movieId: number): Promise<Movie> {
    if (isEmpty(movieId)) throw new HttpException(400, "You're not movieId");

    const findMovie: Movie = await MovieEntity.findOne({ where: { id: movieId } });

    if (!findMovie) throw new HttpException(409, "You're not movie");

    if (!findMovie.isVisible) throw new HttpException(401, 'Movie is hidden');

    return findMovie;
  }

  public async findMyMovieById(movieId: number, userData: User): Promise<Movie> {
    if (isEmpty(movieId)) throw new HttpException(400, "You're not movieId");

    const findMovie: Movie = await MovieEntity.findOne({ where: { id: movieId } });

    if (!findMovie) throw new HttpException(409, "You're not movie");

    if (findMovie.creatorId !== userData.id) throw new HttpException(401, 'You are not Creator');

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

  public async updateMovie(movieId: number, movieData: CreateMovieDto, userData: User): Promise<Movie> {
    if (isEmpty(movieData)) throw new HttpException(400, "You're not movieData");

    const findMovie: Movie = await MovieEntity.findOne({ where: { id: movieId } });
    if (!findMovie) throw new HttpException(409, "You're not movie");

    if (userData.id !== findMovie.creatorId) throw new HttpException(401, "You're not owner");

    const findMovieName: Movie = await MovieEntity.findOne({ where: { name: movieData.name } });
    if (findMovieName && findMovieName.id != movieId) throw new HttpException(409, `You're actor ${movieData.name} already exists`);

    await MovieEntity.update(movieId, movieData);

    const updateMovie: Movie = await MovieEntity.findOne({ where: { id: movieId } });
    return updateMovie;
  }

  public async deleteMovie(movieId: number, userData: User): Promise<Movie> {
    if (isEmpty(movieId)) throw new HttpException(400, "You're not movieId");

    const findMovie: Movie = await MovieEntity.findOne({ where: { id: movieId } });
    if (!findMovie) throw new HttpException(409, "You're not movie");

    if (userData.id !== findMovie.creatorId) throw new HttpException(401, "You're not owner");

    await MovieEntity.delete({ id: movieId });
    return findMovie;
  }
}

export default MovieService;
