import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

const appConfig = config.get('app');
const logger = new Logger('AppBootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: true
  });

  await app.listen(appConfig.port);
}
bootstrap()
  .then(() => {
    logger.log(`Application listening on port: ${appConfig.port}`);
  });
