import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 8087;
  await app.listen(port, () =>
    console.log(`Job Processor is running on port ${port}`),
  );
}
bootstrap();
