import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import {
  SQSClient,
  ReceiveMessageCommand,
  SendMessageCommand,
  DeleteMessageCommand,
  GetQueueAttributesCommand,
} from '@aws-sdk/client-sqs';
import {
  EventBridgeClient,
  PutEventsCommand,
  PutEventsCommandInput,
} from '@aws-sdk/client-eventbridge';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class PdfGeneratorService {
  constructor(private configService: ConfigService) {}

  async generatePdfs() {
    const batchCount = 2;
    const sqsClient = new SQSClient({});

    const s3Client = new S3Client({});
    const pdfGenQueueUrl: string =
      this.configService.get('PDF_GEN_QUEUE_URL') ?? '';
    const storageBucket: string =
      this.configService.get('STORAGE_BUCKET') ?? '';
    const pdfMailerQueueUrl: string =
      this.configService.get('PDF_MAILER_QUEUE_URL') ?? '';
    const sqsRecieveCommand = new ReceiveMessageCommand({
      QueueUrl: pdfGenQueueUrl,
      MaxNumberOfMessages: batchCount,
    });

    const results = await sqsClient.send(sqsRecieveCommand);
    for await (const message of results.Messages ?? []) {
      const book: any = JSON.parse(message.Body ?? '{}');
      const key = book.title.replaceAll(' ', '-');
      const bookPath = `books/${key}.txt`;
      const bookId: number = book.bookId;
      const s3Command = new PutObjectCommand({
        Bucket: storageBucket,
        Key: bookPath,
        Body: JSON.stringify(book),
      });

      await s3Client.send(s3Command);

      const sqsSendCommand = new SendMessageCommand({
        QueueUrl: pdfMailerQueueUrl,
        MessageBody: JSON.stringify({ bookId, bookPath, title: key }),
      });
      const sqsDeleteCommand = new DeleteMessageCommand({
        QueueUrl: pdfGenQueueUrl,
        ReceiptHandle: message.ReceiptHandle,
      });
      await sqsClient.send(sqsSendCommand);
      await sqsClient.send(sqsDeleteCommand);
    }

    const getAttrCommand = new GetQueueAttributesCommand({
      QueueUrl: pdfGenQueueUrl,
      AttributeNames: ['ApproximateNumberOfMessages'],
    });
    const queueAttributes = await sqsClient.send(getAttrCommand);
    const messageCountStr =
      queueAttributes?.Attributes?.ApproximateNumberOfMessages ?? '0';
    const messageCount = parseInt(messageCountStr);
    if (messageCount == 0) {
      const result = await this.startSendingEmails();
      console.log('startSendingEmails:', result);
    }
    return {
      messageCount,
    };
  }

  async startSendingEmails() {
    const region: string = this.configService.get('REGION_AWS') ?? 'eu-west-2';
    const input: PutEventsCommandInput = {
      Entries: [
        {
          Source: 'job.processor',
          DetailType: 'PdfMailerEvent',
          Detail: JSON.stringify({}),
        },
      ],
    };
    const command = new PutEventsCommand(input);
    const client = new EventBridgeClient({ region });
    return client.send(command);
  }
}
