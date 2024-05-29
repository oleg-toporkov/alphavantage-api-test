import {expect} from "chai";
import {StockService} from "../api/service/stockService";

describe('Stock service', () => {

    it('should return daily data', async () => {
        const stockSymbol = 'ABEC.FRK'

        const response = await StockService.getDailySeries(stockSymbol);
        expect(response.status).to.equal(200);

        expect(response.body['Meta Data'], 'Metadata should present').to.be.not.empty;
        expect(response.body['Meta Data']['1. Information'], 'Metadata is incorrect').to.be.equal('Daily Prices (open, high, low, close) and Volumes');
        expect(response.body['Meta Data']['2. Symbol'], 'Symbol is incorrect').to.be.equal(stockSymbol);
        expect(response.body['Meta Data']['3. Last Refreshed'], 'Last refreshed is incorrect').to.be.a('string').that.is.not.empty;
        expect(response.body['Meta Data']['4. Output Size'], 'Output size is incorrect').to.be.equal('Compact');
        expect(response.body['Meta Data']['5. Time Zone'], 'Time Zone is incorrect').to.be.equal('US/Eastern');

        expect(response.body['Time Series (Daily)'], 'Time Series data should present').to.be.not.empty;

        for (const property in response.body['Time Series (Daily)']) {
            const timeObject = response.body['Time Series (Daily)'][property];

            expect(timeObject['1. open'], `${property} - 'open' value is incorrect`).to.be.a('string').that.is.not.empty;
            expect(timeObject['2. high'], `${property} - 'high' value is incorrect`).to.be.a('string').that.is.not.empty;
            expect(timeObject['3. low'], `${property} - 'low' value is incorrect`).to.be.a('string').that.is.not.empty;
            expect(timeObject['4. close'], `${property} - 'close' value is incorrect`).to.be.a('string').that.is.not.empty;
            expect(timeObject['5. volume'], `${property} - 'volume' value is incorrect`).to.be.a('string').that.is.not.empty;
        }
    });

    it('should return an error for non-existing stock symbol', async () => {
        const stockSymbol = 'BLABLA'

        const response = await StockService.getDailySeries(stockSymbol);

        // expect(response.status).to.equal(400); TODO should be 4xx class error, getting 200 instead
        expect(response.body['Error Message'], 'Error message should present').to.include('Invalid API call');
    });

})