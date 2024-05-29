import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

// 묘사
describe('MoviesService', () => {
    let service: MoviesService;

    // beforeEach: 테스트 수행 전 실행
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MoviesService],
        }).compile();

        service = module.get<MoviesService>(MoviesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAll', () => {
        it('should return an array', () => {
            const result = service.getAll();
            expect(result).toBeInstanceOf(Array); // 배열인지 확인
        });
    });

    describe('getOne', () => {
        it('should return an movie', () => {
            service.create({
                title: 'Test Movie',
                genres: ['test'],
                year: 2000,
            });
            const movie = service.getOne(1);
            expect(movie).toBeDefined(); 
            
        });
        it("should throw 404 error", ()=> {
            try{
                service.getOne(999);
            } catch(e) {
                expect(e).toBeInstanceOf(NotFoundException)
                expect(e.message).toEqual('Movie with ID 999  Not found')
                
            }
        })
    });
});
