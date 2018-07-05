import * as express from 'express';

import * as bodyParser from 'body-parser';
import { injectable } from 'inversify';
import { TALRouter } from './tal.router';

/**
 * Class to implement the APP using Express and its basic attributes so that we can initiale the request and resonse objects of HTTP Request..
 */

@injectable()
export class App {
    public expressApp: express.Application;

    constructor() {
        this.expressApp = express();
        this.configure();
    }

    private configure() {
        this.addGlobalMiddlewares();
        this.configureRoutes();
    }

    private setHeaders = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // Setting CORS headers
        if (req.headers.origin) {
            res.header('Access-Control-Allow-Origin', req.headers.origin);
        }
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Pragma');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
        if ('OPTIONS' === req.method) {
            res.status(200).send();
        } else {
            next();
        }
    }

    private addGlobalMiddlewares() {
        this.expressApp.use(this.setHeaders);
        this.expressApp.use(bodyParser.json() );

        this.expressApp.use(bodyParser.urlencoded({
            extended: true,
        }));
    }

    private configureRoutes() {
        const talRouter = new TALRouter();
        this.expressApp.use('/tal', talRouter.getRouter());
    }
}

export const AppToken = Symbol('App');
