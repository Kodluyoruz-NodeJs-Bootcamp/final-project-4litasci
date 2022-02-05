import { NextFunction, Request, Response } from 'express';
import MovieService from '@services/movie.service';
import { Movie } from '@interfaces/movies.interface';
import { CreateMovieDto } from '@dtos/movies.dto';
import config from 'config';
import { RequestWithUser } from '@interfaces/auth.interface';

class MoviesController {
  public movieService = new MovieService();

  public getMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllMoviesData: Movie[] = await this.movieService.findAllMovies();

      res.status(200).json({ data: findAllMoviesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMovieById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const movieId = Number(req.params.id);
      const findOneMovieData: Movie = await this.movieService.findMovieById(movieId);

      res.status(200).json({ data: findOneMovieData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createMovie = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const movieData: CreateMovieDto = req.body;
      const createMovieData: Movie = await this.movieService.createMovie(movieData, req.user);

      res.status(201).json({ data: createMovieData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public createMockMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const movieDataArray: CreateMovieDto[] = config.get('mockMovies');
      const newMovies: Movie[] = [];
      for (const movieData of movieDataArray) {
        const newMovie: Movie = await this.movieService.createMovieMock(movieData);
        newMovies.push(newMovie);
      }

      res.status(201).json({ data: newMovies, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const movieId = Number(req.params.id);
      const movieData: CreateMovieDto = req.body;
      const updateMovieData: Movie = await this.movieService.updateMovie(movieId, movieData);

      res.status(200).json({ data: updateMovieData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const movieId = Number(req.params.id);
      const deleteMovieData: Movie = await this.movieService.deleteMovie(movieId);

      res.status(200).json({ data: deleteMovieData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default MoviesController;
