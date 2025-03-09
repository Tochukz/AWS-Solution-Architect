import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataProcessorService } from './data-processor/data-processor.service';
import { PdfGeneratorService } from './pdf-generator/pdf-generator.service';
import { PdfMailerService } from './pdf-mailer/pdf-mailer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DataProcessorService,
    PdfGeneratorService,
    PdfMailerService,
  ],
})
export class AppModule {}
