# REST API Test Automation for Alpha Vantage API #

### Based on ###

* [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
* [Mocha](https://mochajs.org/) - Test framework with TDD/BDD style
* [Chai](http://chaijs.com/) - Assertion library
* [Supertest](https://github.com/visionmedia/supertest) - REST API testing automation tool


### Prerequisites ###

* [Node.js](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)

### Set up ###

First, install all dependencies using running [NPM](https://www.npmjs.com/) from root folder as current working directory

```
#!bash
npm ci
```


### Running tests ###

Run all tests

```
#!bash
npm run test
```


## Testing code improvements
* Add JSON schema validation
* Add more logging
* Add nice report
* Extract common response body checks

## Found issues
* `OVERVIEW` operation returns successful response code and empty body for non-existing stock symbol
* `TIME_SERIES_DAILY` operation returns successful response code for non-existing stock symbol


## Test cases

### 1. Getting daily series for existing stock symbol
Send `GET` request to the https://www.alphavantage.co/query
Request data:

| Query Parameter Name  | Query Parameter Value |
| ------------- | ------------- |
| function | TIME_SERIES_DAILY |
| symbol | ABEC.FRK |
| outputsize | compact |
| datatype | json |
| apikey | DH9KS1PIU48DZLFO |

Example URL: https://www.alphavantage.co/query?apikey=DH9KS1PIU48DZLFO&function=TIME_SERIES_DAILY&symbol=ABEC.FRK&outputsize=compact&datatype=json

*Expected result:* Service returns 200 OK response code along with the JSON response body. \
Response body should contain following top-level objects: `Meta Data` and `Time Series (Daily)`. All fields should be filled in. \
Each entry in `Time Series (Daily)` should contain five fields (`open`, `high`, `low`, `close`, `volume`) with data. \
[Automated test](src/test/stockService.spec.ts#L6)

### 2. Getting daily series for non-existing stock symbol
Send `GET` request to the https://www.alphavantage.co/query
Request data:

| Query Parameter Name  | Query Parameter Value |
| ------------- | ------------- |
| function | TIME_SERIES_DAILY |
| symbol | BLABLA |
| outputsize | compact |
| datatype | json |
| apikey | DH9KS1PIU48DZLFO |

Example URL: https://www.alphavantage.co/query?apikey=DH9KS1PIU48DZLFO&function=TIME_SERIES_DAILY&symbol=BLABLA&outputsize=compact&datatype=json

*Expected result:* Service returns 404 response code with error message indicating that stock symbol is not found. \
[Automated test](src/test/stockService.spec.ts#L32)

### 3. Getting company overview data for existing stock symbol
Send `GET` request to the https://www.alphavantage.co/query
Request data:

| Query Parameter Name  | Query Parameter Value |
| ------------- | ------------- |
| function | OVERVIEW |
| symbol | IBM |
| apikey | DH9KS1PIU48DZLFO |

Example URL: https://www.alphavantage.co/query?apikey=DH9KS1PIU48DZLFO&function=OVERVIEW&symbol=IBM

*Expected result:* Service returns 200 response code along with the JSON response body. \
Response body should contain all company data (see [here](src/api/dto/companyOverviewResponseDTO.ts)) \
[Automated test](src/test/fundamentalDataService.spec.ts#6)


### 4. Getting company overview data for non-existing stock symbol
Send `GET` request to the https://www.alphavantage.co/query
Request data:

| Query Parameter Name  | Query Parameter Value |
| ------------- |-----------------------|
| function | OVERVIEW              |
| symbol | BLABLA                |
| apikey | DH9KS1PIU48DZLFO      |

Example URL: https://www.alphavantage.co/query?apikey=DH9KS1PIU48DZLFO&function=OVERVIEW&symbol=IBM

*Expected result:* Service returns 404 response code with error message indicating that stock symbol is not found. \
[Automated test](src/test/fundamentalDataService.spec.ts#16)
