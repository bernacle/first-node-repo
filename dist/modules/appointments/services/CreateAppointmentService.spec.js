"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _dateFns = require("date-fns");

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let fakeNotificationsRepository;
let fakeCacheProvider;
let createAppointment;
describe("CreateAppointment", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
  });
  it("should be able to create a new appointment", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: "12312312312",
      user_id: "123123"
    });
    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("12312312312");
  });
  it("should not be able to create two appointments on the same time", async () => {
    const appointmentDate = (0, _dateFns.addDays)(new Date(Date.now()), 2);
    await createAppointment.execute({
      date: appointmentDate,
      provider_id: "12312312312",
      user_id: "123123"
    });
    await expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: "12312312312",
      user_id: "123123"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to create an appointment on a past date", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      provider_id: "12312312312",
      user_id: "123123"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to create an appointment with same user as provider", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: "12312312312",
      user_id: "12312312312"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to create an appointment before 8am or after 5pm", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      provider_id: "12312312312",
      user_id: "3123213"
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      provider_id: "12312312312",
      user_id: "3123213"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});