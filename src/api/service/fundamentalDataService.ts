import supertest from "supertest";
import {config} from "../config";
import {prettyPrint} from "../util";
import {CompanyOverviewResponseDTO} from "../dto/companyOverviewResponseDTO";
import {expect} from "chai";

export class FundamentalDataService {

    static async getCompanyOverviewResponse(equitySymbol: string): Promise<supertest.Response> {
        return supertest(config.api_host)
            .get('')
            .query({
                apikey: config.api_key,
                function: 'OVERVIEW',
                symbol: equitySymbol
            })
            .on('response', (response: supertest.Response) => prettyPrint(response));
    }

    static async getCompanyOverviewData(equitySymbol: string): Promise<CompanyOverviewResponseDTO> {
        const response = await this.getCompanyOverviewResponse(equitySymbol);
        expect(response.status).to.be.equal(200);

        return response.body as CompanyOverviewResponseDTO;
    }
}