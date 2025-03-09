import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfMailerService {
  sendEmails() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Email sent');
      }, 2000);
    });
  }
}
