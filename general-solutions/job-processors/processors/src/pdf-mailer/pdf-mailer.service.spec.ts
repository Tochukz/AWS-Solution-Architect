import { Test, TestingModule } from '@nestjs/testing';
import { PdfMailerService } from './pdf-mailer.service';

describe('PdfMailerService', () => {
  let service: PdfMailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfMailerService],
    }).compile();

    service = module.get<PdfMailerService>(PdfMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
