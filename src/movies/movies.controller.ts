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

@Controller('movies')
export class MoviesController {
    @Get()
    getAll() {
        return 'This will return all movies';
    }

    @Get('search')
    search(
        @Query('year') searchingYear: string,
        @Query('name') searchingName: string,
    ) {
        return `We are searching for a movie with a title ${searchingYear} ${searchingName}`;
    }

    @Get('/:id')
    getOne(@Param('id') moviId: string) {
        return `This will return one movie ${moviId}`;
    }

    @Post()
    create(@Body() movieData) {
        return movieData;
    }

    @Delete('/:id')
    remove(@Param('id') moviedId: string) {
        return `This will delete a movid => ${moviedId}`;
    }

    @Patch('/:id')
    path(@Param('id') moviId: string, @Body() updateData) {
        return {
            updataMovie: moviId,
            ...updateData,
        };
    }
}
