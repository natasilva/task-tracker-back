import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://10.0.2.2:8081', // URL do frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true, // Permite cookies, se necessário
  });

  await app.listen(3000);
}
bootstrap();
