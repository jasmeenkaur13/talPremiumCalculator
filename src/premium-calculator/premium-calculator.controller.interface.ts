import { Request, Response } from 'express';

/**
 * Inteface for Premium Calculation
 */
export interface IPremiumCalculatorController {
    /**
     * Calculates Premium according to the input received
     * @param req
     * @param res
     */
    calculatePremium(req: Request, res: Response): Promise<any>;
}

export const IPremiumCalculatorControllerToken = Symbol('IPremiumCalculatorController');
