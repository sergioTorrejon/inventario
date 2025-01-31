import {
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { initSwagger } from './core/app.swagger';
import {
  appConfig,
  SERVER_PORT,
} from './core/config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;

  initSwagger(app);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port);
  logger.setContext(`RUN-APP`)
  logger.log(`API RUN http://localhost:${appConfig.SERVER_PORT}`)
  logger.log(`API VERIFY http://localhost:${appConfig.SERVER_PORT}/estado`)
}
bootstrap();
