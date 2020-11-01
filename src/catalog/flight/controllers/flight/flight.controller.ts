import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateFlightDto } from '../../dto/create-flight.dto';
import { FlightIdDto } from '../../dto/flight-id.dto';
import { UpdateFlightDto } from '../../dto/update-flight.dto';
import { FlightEntity } from '../../repositories/flight.entity';
import { FlightService } from '../../services/flight/flight.service';
import { TextResponseModel } from '../../models/text-response.model';

@Controller()
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @MessagePattern({ role: 'flight', cmd: 'getSingle' })
  async getSingleFlight(id: number): Promise<FlightEntity> {
    return this.flightService.getSingleFlight(id);
  }

  @MessagePattern({ role: 'flight', cmd: 'getAll' })
  async getAllFlights(): Promise<FlightEntity[]> {
    return this.flightService.getAllFlights();
  }

  @MessagePattern({ role: 'flight', cmd: 'create' })
  async createFlight(createFlightDto: CreateFlightDto): Promise<FlightEntity> {
    return this.flightService.createFlight(createFlightDto);
  }

  @MessagePattern({ role: 'flight', cmd: 'update' })
  async updateFlight(updateFlightDto: UpdateFlightDto): Promise<FlightEntity> {
    return this.flightService.updateFlight(updateFlightDto);
  }

  @MessagePattern({ role: 'flight', cmd: 'delete' })
  async deleteFlight(id: number): Promise<TextResponseModel> {
    return this.flightService.deleteFlight(id);
  }
}
