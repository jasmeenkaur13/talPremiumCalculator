import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { AppConfig } from '../app-config';
import { AppConstant } from '../constants/app.constants';
import { genderFactor } from '../enums/gender-factor.enum';
import { IPremiumCalculatorController } from './premium-calculator.controller.interface';

/**
 * Class responsible for calculating the premium of Clients according to the data passed
 */
@injectable()
export class PremiumCalculatorController implements IPremiumCalculatorController {

    /**
     * Methdo responsible for calucality premium with validations in place.
     * @param req
     * @param res
     */
    public async calculatePremium(req: Request, res: Response): Promise<any> {
        console.log('in');
        const agePassed = req.params.age;
        if (req.params.gender in genderFactor) {
            console.log('in');
            const gender: genderFactor = req.params.gender as genderFactor;
            if (isNaN(agePassed)) {
                console.log('inerr');
                res.status(400).json(AppConstant.AGE_ERROR);
            } else {
                console.log('in');
                const premium = Math.round(agePassed * Number(genderFactor[req.params.gender]) * Number(AppConfig.talPremiumConstant));
                console.log(premium);
                res.status(200).json(premium);
            }
        } else {
            res.status(400).json(AppConstant.GENDER_ERROR);
        }
    }
}
