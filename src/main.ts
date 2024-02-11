import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port, '0.0.0.0', () => console.log(`Listening on port: ${port}`));
  console.log(`Server is running on port ${port}`);
}
bootstrap();
