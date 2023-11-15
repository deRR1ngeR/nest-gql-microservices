import { NestFactory } from '@nestjs/core';
import { UserModule } from './apps/user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.listen(3001);
}
bootstrap();
