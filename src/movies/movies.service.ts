import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// 이는 이 클래스가 의존성 주입이 가능한 프로바이더임을 나타냅니다.
// NestJS는 이 데코레이터를 통해 이 클래스를 인스턴스화할 수 있습니다.
// 의존성 주입 컨테이너에 등록
@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        console.log(id, typeof id);
        const movie = this.movies.find((movie) => movie.id === id); // +id string=> number로 변경 (parseInt(id)와 같음))
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id}  Not found`);
        }
        return movie;
    }

    deleteOne(id: number) {
        this.getOne(id);
        this.movies = this.movies.filter((movie) => movie.id !== id);
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

    update(id: number, updateData: UpdateMovieDto) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData });
    }
}
