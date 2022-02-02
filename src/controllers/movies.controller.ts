import { NextFunction, Request, Response } from 'express';
import MovieService from '@services/movie.service';
import { Movie } from '@interfaces/movies.interface';
import { CreateMovieDto } from '@dtos/movies.dto';

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

  public createMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateMovieDto = req.body;
      const createMovieData: Movie = await this.movieService.createMovie(userData);

      res.status(201).json({ data: createMovieData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const movieId = Number(req.params.id);
      const userData: CreateMovieDto = req.body;
      const updateMovieData: Movie = await this.movieService.updateMovie(movieId, userData);

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
