import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // Optional: sets prefix like /api/blog
  app.enableCors(); // Enable CORS if you want to connect from frontend

  await app.listen(3009);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
