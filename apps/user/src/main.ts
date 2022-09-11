import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('PORT'));
  console.log(`running on port = ${configService.get('PORT')}`);
}
bootstrap();
