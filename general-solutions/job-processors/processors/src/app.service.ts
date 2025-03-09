import { PdfMailerService } from './pdf-mailer/pdf-mailer.service';
import { PdfGeneratorService } from './pdf-generator/pdf-generator.service';
import { DataProcessorService } from 'src/data-processor/data-processor.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private dataProcessorService: DataProcessorService,
    private pdfGeneratorService: PdfGeneratorService,
    private pdfMailerService: PdfMailerService,
  ) {}

  getHello(): string {
    return 'Hello Job Processor';
  }

  async processData() {
    return this.dataProcessorService.processData();
  }

  async generatePdfs() {
    return this.pdfGeneratorService.generatePdfs();
  }

  async sendEmails() {
    return this.pdfMailerService.sendEmails();
  }
}
