import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UtilsModule } from '../../utils/utils.module';
import { CommandHandlers } from './commands/handlers';
import { CarsController } from './controllers/cars/cars.controller';
import { QueryHandlers } from './queries/handlers';
import { CarsSubscriber, CarsEntity, CarsRepository } from './repositories';
import { CarsService } from './services/cars/cars.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarsRepository, CarsEntity]),
    CqrsModule,
    UtilsModule,
  ],
  controllers: [CarsController],
  providers: [
    CarsService,
    ...CommandHandlers,
    ...QueryHandlers,
    CarsSubscriber,
  ],
})
export class CarsModule {}