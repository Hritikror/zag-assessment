import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ZAG-Rest-API')
    .setDescription('FOR UI integration api are shown below')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  document.paths['/'].get = undefined;
  SwaggerModule.setup('/api', app, document); // Check if the path is conflicting
  
  await app.listen(3000);
}
bootstrap();
