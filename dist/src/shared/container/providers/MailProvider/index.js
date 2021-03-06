"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var mail_1 = __importDefault(require("@config/mail"));
var EherealMailProvider_1 = __importDefault(require("./implementations/EherealMailProvider"));
var SESMailprovider_1 = __importDefault(require("./implementations/SESMailprovider"));
var providers = {
    ethereal: tsyringe_1.container.resolve(EherealMailProvider_1.default),
    ses: tsyringe_1.container.resolve(SESMailprovider_1.default),
};
tsyringe_1.container.registerInstance("MailProvider", providers[mail_1.default.driver]);
