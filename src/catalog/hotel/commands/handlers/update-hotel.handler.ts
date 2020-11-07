import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { HotelEntity, HotelRepository } from '../../repositories';
import { UpdateHotelCommand } from '../impl';

@CommandHandler(UpdateHotelCommand)
export class UpdateHotelHandler implements ICommandHandler<UpdateHotelCommand> {
  constructor(
    @InjectRepository(HotelRepository)
    private readonly hotelRepository: HotelRepository,
  ) {}

  async execute(command: UpdateHotelCommand): Promise<HotelEntity> {
    const hotel: HotelEntity = await this.hotelRepository.findOne(
      command.updateHotelDto.id,
    );

    hotel.name = command.updateHotelDto.updateHotelDto.name;
    hotel.description = command.updateHotelDto.updateHotelDto.description;

    try {
      hotel.save();
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Cannot update hotel',
      });
    }

    return hotel;
  }
}
