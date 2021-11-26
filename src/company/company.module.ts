import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';

@Module({
  imports: [],

  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
