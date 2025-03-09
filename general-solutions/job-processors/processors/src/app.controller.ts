import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/process-data')
  async processData() {
    return this.appService.processData();
  }

  @Post('/generate-pdf')
  async generatePdfs() {
    return this.appService.generatePdfs();
  }

  @Post('/send-emails')
  async sendEmails() {
    return this.appService.sendEmails();
  }
}
