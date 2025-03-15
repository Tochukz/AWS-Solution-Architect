import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageBatchCommand } from '@aws-sdk/client-sqs';
import {
  EventBridgeClient,
  PutEventsCommand,
  PutEventsCommandInput,
} from '@aws-sdk/client-eventbridge';

import { books } from './data-store';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataProcessorService {
  constructor(private configService: ConfigService) {}

  async processData() {
    const bookList = books.slice(0, 10);
    const simulationTime = 10000; //10 seconds
    // const simulationTime = 30000; //30 seconds

    const client = new SQSClient({});
    const pdfGenQueueUrl: string =
      this.configService.get('PDF_GEN_QUEUE_URL') ?? '';

    const result = await new Promise((resolve, reject) => {
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
    const res = await this.startPdfGeneration();
    console.log('startPdfGeneration', res);
    return result;
  }

  async startPdfGeneration() {
    const region: string = this.configService.get('REGION_AWS') ?? 'eu-west-2';
    const input: PutEventsCommandInput = {
      Entries: [
        {
          Source: 'job.processor',
          DetailType: 'PdfGenEvent',
          Detail: JSON.stringify({}),
        },
      ],
    };
    const command = new PutEventsCommand(input);
    const client = new EventBridgeClient({ region });
    return client.send(command);
  }
}
