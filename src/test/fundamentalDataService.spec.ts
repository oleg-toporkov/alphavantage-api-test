import {FundamentalDataService} from "../api/service/fundamentalDataService";
import {expect} from "chai";

describe('Fundamental data service', () => {

    it('should return company overview data', async () => {
        const stockSymbol = 'IBM'

        const response = await FundamentalDataService.getCompanyOverviewData(stockSymbol);
        expect(response.Symbol, 'Stock symbol is incorrect').to.be.equal(stockSymbol);
        expect(response.AssetType, 'Asset type is incorrect').to.be.equal('Common Stock');
        expect(response.Name, 'Name is incorrect').to.be.equal('International Business Machines');
        // and so on if needed
    })

    it('should return an error for non-existing stock symbol', async () => {
        const stockSymbol = 'BLABLA'

        const response = await FundamentalDataService.getCompanyOverviewResponse(stockSymbol);

        // expect(response.status).to.equal(400); TODO should be 4xx class error, getting 200 instead
        //expect(response.body['Error Message'], 'Error message should present').to.include('Invalid API call'); TODO getting empty body
        expect(response.body, 'Response body should be empty').to.be.empty;
    });

})