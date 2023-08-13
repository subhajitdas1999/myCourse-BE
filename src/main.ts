import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
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
