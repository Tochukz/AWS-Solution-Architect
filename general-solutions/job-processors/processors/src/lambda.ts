import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataProcessorService } from 'src/data-processor/data-processor.service';

type Context = {
  functionName: string;
  getRemainingTimeInMillis: () => number;
};

export const handler = async (event: any, context: Context) => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataProcessorService = app.get(DataProcessorService);

  let result: any = {};
  const functionName = context?.functionName ?? '';
  if (functionName.includes('DataPreparationFunc')) {
    result = await dataProcessorService.processData();
  } else if (functionName.includes('PdfGenerationFunc')) {
    //
  } else if (functionName.includes('PdfMailerFunc')) {
    //
  } else {
    throw new Error('Invalid function name');
  }

  return {
    statusCode: 200,
    result,
  };
};
