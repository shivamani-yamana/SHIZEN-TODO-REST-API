import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  
  
  const config = new DocumentBuilder()
    .setTitle('Shizen Todo REST API')
    .setDescription('A Todo REST API built using NESTJS')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('shizen-todo')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
});

  await app.listen(3000);
}
bootstrap();
