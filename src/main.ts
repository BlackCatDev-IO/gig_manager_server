import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './error-handling/exception.filters';

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new Logger(),
  });
  app.useStaticAssets(join(__dirname, '..', 'static'));

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Gig Manager')
    .setDescription('Project Tracker')
    .setVersion('1.0')
    .addTag('Users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    console.log('Server started on port: ' + port);
  });
}
bootstrap();
