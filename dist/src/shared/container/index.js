"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
require("@modules/users/providers");
require("./providers");
var AppointmentRepository_1 = __importDefault(require("@modules/appointments/infra/typeorm/repositories/AppointmentRepository"));
var UsersRepositories_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UsersRepositories"));
var UserTokensRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UserTokensRepository"));
var NotificationsRepository_1 = __importDefault(require("@modules/notifications/infra/typeorm/repositories/NotificationsRepository"));
tsyringe_1.container.registerSingleton("AppointmentsRepository", AppointmentRepository_1.default);
tsyringe_1.container.registerSingleton("UsersRepository", UsersRepositories_1.default);
tsyringe_1.container.registerSingleton("UserTokensRepository", UserTokensRepository_1.default);
tsyringe_1.container.registerSingleton("NotificationsRepository", NotificationsRepository_1.default);
