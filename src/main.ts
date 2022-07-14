import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'src/utils/httpexceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swaggerDocument/SwaggerDocument.json';
import SwaggerCss from './swaggerDocument/swaggerStyles';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 600000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors();
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, SwaggerCss),
  );
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
