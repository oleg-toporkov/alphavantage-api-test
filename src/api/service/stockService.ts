import supertest from "supertest";
import {config} from "../config";
import {prettyPrint} from "../util";

export class StockService {

    static async getDailySeries(equitySymbol: string,
                                outputSize: 'compact' | 'full' = 'compact',
                                dataType: 'csv' | 'json' = 'json'): Promise<supertest.Response> {
        return supertest(config.api_host)
            .get('')
            .query({
                apikey: config.api_key,
                function: 'TIME_SERIES_DAILY',
                symbol: equitySymbol,
                outputsize: outputSize,
                datatype: dataType
            })
            .on('response', (response: supertest.Response) => prettyPrint(response));
    }
}