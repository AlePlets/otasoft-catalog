import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { TextResponseModel } from '../../models/text-response.model';
import { HotelRepository } from '../../repositories';
import { DeleteHotelCommand } from '../impl';

@CommandHandler(DeleteHotelCommand)
export class DeleteHotelHandler implements ICommandHandler<DeleteHotelCommand> {
  constructor(
    @InjectRepository(HotelRepository)
    private readonly hotelRepository: HotelRepository,
  ) {}

  async execute(command: DeleteHotelCommand): Promise<TextResponseModel> {
    try {
      this.hotelRepository.delete(command.id);
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Cannot remove hotel',
      });
    }

    return {
      response: `Hotel with ID #${command.id} successfuly deleted`,
    };
  }
}
