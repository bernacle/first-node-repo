import { injectable, inject } from "tsyringe";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import Appointment from "../infra/typeorm/entities/Appointment";

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointments {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const appointments = this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year,
    });

    await this.cacheProvider.save("asd", "asd");

    return appointments;
  }
}

export default ListProviderAppointments;
