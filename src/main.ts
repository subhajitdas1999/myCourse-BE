import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:5173'],
      credentials: true,
    },
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // with this we no longer have to explicitly specific types in @Type() decorator // see pagination-query.dto.ts
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
