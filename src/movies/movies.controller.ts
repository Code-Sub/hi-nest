import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';


@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get('search')
    search(
        @Query('year') searchingYear: string,
        @Query('name') searchingName: string,
    ) {
        return `We are searching for a movie with a title ${searchingYear} ${searchingName}`;
    }

    @Get('/:id')
    getOne(@Param('id') moviId: string): Movie {
        return this.moviesService.getOne(moviId)
    }

    @Post()
    create(@Body() movieData) {
        
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    remove(@Param('id') moviedId: string) {
        return this.moviesService.deleteOne(moviedId)
    }

    @Patch('/:id')
    path(@Param('id') moviId: string, @Body() updateData) {
        return {
            updataMovie: moviId,
            ...updateData,
        };
    }
}
