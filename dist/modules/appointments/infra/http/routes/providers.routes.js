"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middleware/ensureAuthenticated"));

var _celebrate = require("celebrate");

var _ProvidersController = _interopRequireDefault(require("../controllers/ProvidersController"));

var _ProvidersDayAvailabilityController = _interopRequireDefault(require("../controllers/ProvidersDayAvailabilityController"));

var _ProvidersMonthAvailabilityController = _interopRequireDefault(require("../controllers/ProvidersMonthAvailabilityController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providersRouter = (0, _express.Router)();
const providersController = new _ProvidersController.default();
const providersDayAvailabilityController = new _ProvidersDayAvailabilityController.default();
const providersMonthAvailabilityController = new _ProvidersMonthAvailabilityController.default();
providersRouter.use(_ensureAuthenticated.default);
providersRouter.get("/", providersController.index);
providersRouter.get("/:provider_id/day-availability", (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    provider_id: _celebrate.Joi.string().uuid().required()
  }
}), providersDayAvailabilityController.index);
providersRouter.get("/:provider_id/month-availability", (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    provider_id: _celebrate.Joi.string().uuid().required()
  }
}), providersMonthAvailabilityController.index);
var _default = providersRouter;
exports.default = _default;