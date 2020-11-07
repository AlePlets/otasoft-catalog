import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { TextResponseModel } from '../../models/text-response.model';
import { ActivityRepository } from '../../repositories';
import { DeleteActivityCommand } from '../impl';

@CommandHandler(DeleteActivityCommand)
export class DeleteActivityHandler
  implements ICommandHandler<DeleteActivityCommand> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
  ) {}

  async execute(command: DeleteActivityCommand): Promise<TextResponseModel> {
    try {
      this.activityRepository.delete(command.id);
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Cannot remove activity',
      });
    }

    return {
      response: `Activity with id #${command.id} successfuly deleted`,
    };
  }
}
