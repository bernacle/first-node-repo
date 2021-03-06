"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

require("./providers");

var _AppointmentRepository = _interopRequireDefault(require("../../modules/appointments/infra/typeorm/repositories/AppointmentRepository"));

var _UsersRepositories = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepositories"));

var _UserTokensRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokensRepository"));

var _NotificationsRepository = _interopRequireDefault(require("../../modules/notifications/infra/typeorm/repositories/NotificationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton("AppointmentsRepository", _AppointmentRepository.default);

_tsyringe.container.registerSingleton("UsersRepository", _UsersRepositories.default);

_tsyringe.container.registerSingleton("UserTokensRepository", _UserTokensRepository.default);

_tsyringe.container.registerSingleton("NotificationsRepository", _NotificationsRepository.default);