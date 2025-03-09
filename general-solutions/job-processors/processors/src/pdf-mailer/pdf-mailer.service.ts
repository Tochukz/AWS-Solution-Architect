import { Injectable } from '@nestjs/common';
import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput,
  SendEmailCommandOutput,
} from '@aws-sdk/client-ses';

@Injectable()
export class PdfMailerService {
  constructor(private configService: ConfigService) {}

  async sendEmails() {
    const batchCount = 2;
    const pdfMailerQueueUrl: string =
      this.configService.get('PDF_MAILER_QUEUE_URL') ?? '';
    const sqsRecieveCommand = new ReceiveMessageCommand({
      QueueUrl: pdfMailerQueueUrl,
      MaxNumberOfMessages: batchCount,
    });
    const sqsClient = new SQSClient({});
    const results = await sqsClient.send(sqsRecieveCommand);
    for await (const message of results.Messages ?? []) {
      await this.sendEmail(message);

      const sqsDeleteCommand = new DeleteMessageCommand({
        QueueUrl: pdfMailerQueueUrl,
        ReceiptHandle: message.ReceiptHandle,
      });
      await sqsClient.send(sqsDeleteCommand);
    }

    return results;
  }

  async sendEmail(message) {
    const book = JSON.parse(message.Body ?? '{}');
    const bookPath = book.bookPath;
    const title = book.title ?? 'New Arrival';
    const recepientEmail = 'tochukwu.nwachukwu@scrums.com';

    const source: string = this.configService.get('SOURCE_EMAIL') ?? '';
    const storage: string = this.configService.get('STORAGE_BUCKET') ?? '';
    const pdfMailerQueueUrl: string =
      this.configService.get('PDF_MAILER_QUEUE_URL') ?? '';

    const s3Command = new GetObjectCommand({
      Bucket: storage,
      Key: bookPath,
    });
    const s3Client = new S3Client({});
    const response = await s3Client.send(s3Command);
    const data = await response?.Body?.transformToString();

    const input: SendEmailCommandInput = {
      Source: source,
      Destination: {
        ToAddresses: [recepientEmail],
        CcAddresses: [],
      },
      Message: {
        Subject: {
          Data: title,
        },
        Body: {
          Text: {
            Data: data,
          },
        },
      },
    };
    const emailCommand = new SendEmailCommand(input);

    const sesClient = new SESClient({});
    const emailResult = await sesClient.send(emailCommand);
    console.log('emailResult', emailResult);
    return emailResult;
  }
}
