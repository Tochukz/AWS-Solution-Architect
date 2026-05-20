/** This is the Lambda Entry Point for the Login Application for login and forgot-password operations  */
import { configure as serverlessExpress } from '@codegenie/serverless-express';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create<NestExpressApplication>(AppModule);

    nestApp.disable('x-powered-by');
    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }
  if (!event.requestContext) {
    event.requestContext = context;
  }

  return cachedServer(event, context);
};