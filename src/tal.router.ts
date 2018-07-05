import { Router } from 'express';
import * as express from 'express';

import { PremiumCalculatorController } from './premium-calculator/premium-calculator.controller';

/**
 * A Node Express Router to route the HTTP Request according to HTTP verb
 */
export class TALRouter {
    private router: Router;
    private handler: PremiumCalculatorController;

    constructor() {
        this.handler = new PremiumCalculatorController();
        this.router = express.Router();
    }

    public getRouter(): Router {
        this.router.get('/:age/:gender/premium', this.handler.calculatePremium);
        return this.router;
    }
}
