import * as http from 'http';
import * as log4js from "log4js";
import 'reflect-metadata';
import { App, AppToken } from './app';
import { container } from './inversify.config';

export class Server {
    public talLogger: log4js.Logger;

    private isHttps: boolean;
    private port: number;

    constructor(port: number, isHttps: boolean = false) {
        this.port = port;
        this.isHttps = isHttps;
        this.talLogger = log4js.getLogger("main");
    }

    public start() {
        const app = container.get<App>(AppToken);
        const httpServer = http.createServer(app.expressApp);
        httpServer.listen(this.port);
        httpServer.on('error', (err: any) => {
            this.talLogger.error('An Unhandled error has occured', err.message);
        });
        httpServer.on('listening', () => {
            const bind = typeof this.port === 'string'
                ? 'Pipe ' + this.port
                : 'Port ' + this.port;
            this.talLogger.info('Listening on ' + bind);
        });
        process.on('unhandledRejection', (error: any) => {
            this.talLogger.error('unhandledRejection', error);
        });
        process.on('uncaughtException', (error: any) => {
            this.talLogger.error('uncaughtException', error);
            // process.exit(1);
        });
    }
}
