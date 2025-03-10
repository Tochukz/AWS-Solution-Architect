import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataProcessorService } from 'src/data-processor/data-processor.service';
import { PdfGeneratorService } from './pdf-generator/pdf-generator.service';
import { PdfMailerService } from './pdf-mailer/pdf-mailer.service';

type Context = {
  functionName: string;
  getRemainingTimeInMillis: () => number;
};

export const handler = async (event: any, context: Context) => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataProcessorService = app.get(DataProcessorService);
  const pdfGeneratorService = app.get(PdfGeneratorService);
  const pdfMailerService = app.get(PdfMailerService);

  let result: any = {};
  const functionName = context?.functionName ?? '';
  if (functionName.includes('DataPreparationFunc')) {
    result = await dataProcessorService.processData();
  } else if (functionName.includes('PdfGenerationFunc')) {
    result = await pdfGeneratorService.generatePdfs();
  } else if (functionName.includes('PdfMailerFunc')) {
    result = await pdfMailerService.sendEmails();
  } else {
    throw new Error('Invalid function name');
  }

  return result;
};
