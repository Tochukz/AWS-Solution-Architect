import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageBatchCommand } from '@aws-sdk/client-sqs';

import { books } from './data-store';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataProcessorService {
  constructor(private configService: ConfigService) {}

  async processData() {
    const bookList = books.slice(0, 5);
    const simulationTime = 2000; //2 seconds
    // const simulationTime = 30000; //30 seconds

    const client = new SQSClient({});
    const pdfGenQueueUrl: string =
      this.configService.get('PDF_GEN_QUEUE_URL') ?? '';

    return new Promise((resolve, reject) => {
      //setTimeout is used to simulate a delay in processing the data
      setTimeout(() => {
        const updatedBooks = bookList.map((book) => {
          return { ...book, price: book.price + 100 };
        });
        const command = new SendMessageBatchCommand({
          QueueUrl: pdfGenQueueUrl,
          Entries: updatedBooks.map((book) => {
            return {
              Id: book.bookId.toString(),
              MessageBody: JSON.stringify(book),
            };
          }),
        });
        client
          .send(command)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(new Error(error));
          });
      }, simulationTime);
    });
  }
}
