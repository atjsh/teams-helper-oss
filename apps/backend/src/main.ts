import fastifyCookie from '@fastify/cookie';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { CONFIG_KEYS } from './enviroment-variable-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);

  await app.register(fastifyCookie, {
    secret: configService.getOrThrow(CONFIG_KEYS.COOKIE_SECRET),
    parseOptions: {
      httpOnly: true,
      signed: true,
      secure: true,
      path: '/',
    },
  });

  app.enableCors({
    origin: configService.getOrThrow(CONFIG_KEYS.FRONTEND_URL),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Access-Control-Request-Methods',
      'Access-Control-Request-Headers',
      'Content-Type',
      'Access-Control-Allow-Origin',
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder().setTitle(`Teams Helper`).build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs/swagger-ui', app, document);

  await app.listen(3000);
}
bootstrap();
