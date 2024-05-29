import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

// DI(Dependency Injection) 컨테이너에 의해 관리될 수 있도록 합니다.
@Module({
    imports: [MoviesModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
