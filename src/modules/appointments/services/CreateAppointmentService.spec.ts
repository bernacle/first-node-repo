import "reflect-metadata";
import AppError from "@shared/errors/AppError";
import FakeNotificationsRepository from "@modules/notifications/repositories/fakes/FakeNotificationsRepository";
import { addDays } from "date-fns";
import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe("CreateAppointment", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it("should be able to create a new appointment", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: "12312312312",
      user_id: "123123",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("12312312312");
  });

  it("should not be able to create two appointments on the same time", async () => {
    const appointmentDate = addDays(new Date(), 2);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: "12312312312",
      user_id: "123123",
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: "12312312312",
        user_id: "123123",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointment on a past date", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: "12312312312",
        user_id: "123123",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointment with same user as provider", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: "12312312312",
        user_id: "12312312312",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointment before 8am or after 5pm", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: "12312312312",
        user_id: "3123213",
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        provider_id: "12312312312",
        user_id: "3123213",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
