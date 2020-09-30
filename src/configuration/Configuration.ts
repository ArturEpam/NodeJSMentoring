import * as dotenv from "dotenv";

export class Configuration {
    private applicationPort: string;
    private dbConnectionString: string;
    private environment: string;

    constructor(applicationPort : string, dbConnectionString : string, environment : string)
    {
        this.applicationPort = applicationPort;
        this.dbConnectionString = dbConnectionString;
        this.environment = environment;
    }

    public getConnectionString(): string {
        return this.dbConnectionString;
    }

    public getApplicationPort(): string {
        return this.applicationPort;
    }

    public isDevEnvironment(): boolean {        
        return this.environment === 'DEV';
    }

    public static getConfiguration() : Configuration {
        dotenv.config();        
        return new Configuration(process.env.APPLICATION_PORT, process.env.CONNECTION_STRING, process.env.ENVIRONMENT);
    }
}