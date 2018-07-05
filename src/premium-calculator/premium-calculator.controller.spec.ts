import 'reflect-metadata';
import { container } from '../inversify.config';
import { IPremiumCalculatorController, IPremiumCalculatorControllerToken } from './premium-calculator.controller.interface';

/**
 * Unit Test cases for Premium Calculator Controller
 */
describe('Health Controller Unit Tests', () => {
    let healthController: IPremiumCalculatorController;
    let res: any;
    let req: any;

    beforeEach((done) => {
        res = {
            json: (value: any) => { return; },
            result: null,
            send: () => { return; },
            status: (code: any) => { return; },
            statusCode: null,
        };

        req = { query: {}, params: {}};

        spyOn(res, 'status').and.callFake((code: any) => {
            res.statusCode = code;
            return res;
        });
        spyOn(res, 'send');
        spyOn(res, 'json').and.callFake((value: any) => {
            res.result = value;
            return res;
        });
        container.snapshot();
        done();
    });

    afterEach((done) => {
        healthController = null;
        res = null;
        req = null;
        container.restore();
        done();
    });

    // Calculate Premium for Male with valid values
    it('calculatePremium to respond with 200', (done) => {
        healthController = container.get<IPremiumCalculatorController>(IPremiumCalculatorControllerToken);
        req.params.age = 1;
        req.params.gender = 'MALE';
        healthController.calculatePremium(req, res)
            .then(() => {
                expect(res.status).toHaveBeenCalledWith(200);
                done();
            }, (error) => {
                expect(true).toBe(false);
                done();
            });

    });

    // Calculate Premium for Female with valid values
    it('calculatePremium to respond with 200', (done) => {
        healthController = container.get<IPremiumCalculatorController>(IPremiumCalculatorControllerToken);
        req.params.age = 1;
        req.params.gender = 'FEMALE';
        healthController.calculatePremium(req, res)
            .then(() => {
                expect(res.status).toHaveBeenCalledWith(200);
                done();
            }, (error) => {
                expect(true).toBe(false);
                done();
            });

    });

    // Calculate Premium to respond with 400 when Invalid age is provided
    it('calculatePremium to respond with 400', (done) => {
        healthController = container.get<IPremiumCalculatorController>(IPremiumCalculatorControllerToken);
        req.params.age = 'a';
        req.params.gender = 'FEMALE';
        healthController.calculatePremium(req, res)
            .then(() => {
                expect(res.status).toHaveBeenCalledWith(400);
                done();
            }, (error) => {
                expect(true).toBe(false);
                done();
            });

    });

    // Calculate Premium to respond with 400 when Invalid gender type is provided
    it('calculatePremium to respond with 400', (done) => {
        healthController = container.get<IPremiumCalculatorController>(IPremiumCalculatorControllerToken);
        req.params.age = 1;
        req.params.gender = 'FMALE';
        healthController.calculatePremium(req, res)
            .then(() => {
                expect(res.status).toHaveBeenCalledWith(400);
                done();
            }, (error) => {
                expect(true).toBe(false);
                done();
            });

    });
});
