import * as express from 'express';
import { Container, interfaces } from 'inversify';
import 'reflect-metadata';

import { App, AppToken } from './app';
import { InjectionToken } from './injection-token';

import { PremiumCalculatorController } from './premium-calculator/premium-calculator.controller';
import { IPremiumCalculatorController, IPremiumCalculatorControllerToken } from './premium-calculator/premium-calculator.controller.interface';
const container = new Container();

// express
container.bind<express.Application>(InjectionToken.ExpressApplicationToken)
    .toDynamicValue((context: interfaces.Context) => {
        return express();
    });

// app
container.bind<App>(AppToken).to(App);

// PremiumCalculatorController
container.bind<IPremiumCalculatorController>(IPremiumCalculatorControllerToken).to(PremiumCalculatorController);

export { container };
