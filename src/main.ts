import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'src/utils/httpexceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swaggerDocument/SwaggerDocument.json';
import SwaggerCss from './swaggerDocument/swaggerStyles';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, SwaggerCss),
  );
  await app.listen(3000);
}
bootstrap();
