import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import MoviesController from '@controllers/movies.controller';
import { CreateMovieDto } from '@dtos/movies.dto';
import authMiddleware from '@/middlewares/auth.middleware';

class MoviesRoute implements Routes {
  public path = '/movies';
  public router = Router();
  public moviesController = new MoviesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.moviesController.getMovies);
    this.router.get(`${this.path}/:id(\\d+)`, this.moviesController.getMovieById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateMovieDto, 'body'), this.moviesController.createMovie);
    this.router.post(`${this.path}/mock`, this.moviesController.createMockMovies);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateMovieDto, 'body', true), this.moviesController.updateMovie);
    this.router.delete(`${this.path}/:id(\\d+)`, this.moviesController.deleteMovie);
  }
}

export default MoviesRoute;
