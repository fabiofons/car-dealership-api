import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 4322);
}
main();
