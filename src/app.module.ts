import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';


// DI 컨테이너에 의해 관리될 수 있도록 합니다.
@Module({
    imports: [],
    controllers: [MoviesController],
    providers: [MoviesService],
})
export class AppModule {}
