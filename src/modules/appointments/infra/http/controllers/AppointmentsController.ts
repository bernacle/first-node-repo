import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";
import ListAppointmentsService from "@modules/appointments/services/ListAppointmentsService";

export default class AppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const listAppointments = container.resolve(ListAppointmentsService);

    const appointments = await listAppointments.execute();

    return response.json(appointments);
  }
}
