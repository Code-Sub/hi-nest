import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll() {
        return 'This will return all movies';
    }

    @Get('/:id')
    getOne(@Param('id') moviId: string) {
        return `This will return one movie ${moviId}`;
    }

    @Post()
    create() {
        return 'This will create to movie';
    }

    @Delete('/:id')
    remove(@Param('id') moviedId: string) {
        return `This will delete a movid => ${moviedId}`;
    }
    
    @Patch('/:id')
    path(@Param('id') moviId: string) {
        return `This winll patch a movie with the id: ${moviId}`
    }
    
    
}
