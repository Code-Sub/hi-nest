import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    // beforeEach
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true, // 들어오는 데이터에서 유효하지 않은 속성을 자동으로 제거하도록 하는 옵션
                forbidNonWhitelisted: true, // 들어오는 데이터에서 유효하지 않은 속성이 있으면 400 에러 발생
                transform: true, // url 요청 문자 타입은 모두 string이기 때문에 number 타입을 사용하기 위한 옵션
            }),
        );
        await app.init();
    });
    // url 요청 테스트
    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Welcome to my Movie API');
    });

    describe('/movies', () => {
        it('GET', () => {
            return request(app.getHttpServer())
                .get('/movies')
                .expect(200)
                .expect([]);
        });

        it('POST', () => {
            return request(app.getHttpServer())
                .post('/movies')
                .send({
                    title: 'Test',
                    year: 2000,
                    genres: ['test'],
                })
                .expect(201);
        });

        it('DELETE', () => {
            // prettier-ignore
            return request(app.getHttpServer())
                .delete('/movies')
                .expect(404);
        });
    });

    describe('/movies/:id', () => {
        it('GET 200', () => {
            // prettier-ignore
            return request(app.getHttpServer())
                .get('/movies/1')
                .expect(200);
        });
        it('GET 404', () => {
            // prettier-ignore
            return request(app.getHttpServer())
                .get('/movies/999')
                .expect(404);
        });

        it.todo('DELETE');
        it.todo('PATCH');
    });
});
