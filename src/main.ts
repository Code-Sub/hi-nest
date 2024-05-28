import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // 들어오는 데이터에서 유효하지 않은 속성을 자동으로 제거하도록 하는 옵션
            forbidNonWhitelisted : true, // 들어오는 데이터에서 유효하지 않은 속성이 있으면 400 에러 발생
            transform:true // 요청 문자 타입은 모두 string이기 때문에 number 타입을 사용하기 위한 옵션
        }),
    );
    await app.listen(3000);
}
bootstrap();
