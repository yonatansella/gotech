import { expect } from 'chai';
import { RestaurantPage } from '../logic/pages/restaurant-page';
import { BrowserWrapper } from '../infra/browser/browser';
import configJson from '../../config.json';
import restaurantsAPI from '../logic/REST/restaurantsAPI';
import { Restaurant } from '../logic/REST/API-Response/get-restaurants-response';
import { ApiResponse } from '../infra/rest/api-response';


describe('UI tests', () => {
    let browser: BrowserWrapper;
    let resturantPage: RestaurantPage;
    let RESTAURANT_LENGTH = 3;

    before('Launch browser', async () => {
        //Reset restaurant server
        await restaurantsAPI.resetServer();

        browser = new BrowserWrapper();
        resturantPage = await browser.newPage(RestaurantPage, configJson.baseUiUrl);
    });

    after('Close browser', async () => {
        await browser.close();
    });

    it('Validate the amount of restaurants', async function () {
        //Act
        const restaurants = await resturantPage.countRestaurants();

        //Assert
        expect(restaurants).to.equal(RESTAURANT_LENGTH);
    });

    it('Validate "Create new Restaurant Popup" opened', async function () {
        //Act
        await resturantPage.clickCreateNewRestaurantButton();

        //Assert
        let actualResult = await resturantPage.checkIfTitleInPopupExist();
        expect(actualResult, 'Restaurants popup was not opened').to.be.true;
    });

    it('Create new restaurant', async function () {
        //Act
        await resturantPage.typeId("1");
        await resturantPage.typeName("name by ui");
        await resturantPage.typeAddress("address by ui");
        await resturantPage.typeScore("10");
        await resturantPage.clickSubmit();
        await resturantPage.checkIfAddedSuccessfully();

        //Assert
        let restaurant = await resturantPage.countRestaurants();
        expect(restaurant).to.equal(RESTAURANT_LENGTH + 1);
    });

    it('Delete restaurant', async function () {
        //Act
        await resturantPage.clickDeleteRestaurantByPositionOnList(1);
        await resturantPage.checkIfDeletedSuccessfully();

        //Assert
        let restaurant = await resturantPage.countRestaurants();
        expect(restaurant).to.equal(RESTAURANT_LENGTH);
    });

    it('Validate the restaurant list in the UI and API', async () => {
        //Act
        let restaurantsApi: ApiResponse<Restaurant[]> = await restaurantsAPI.getRestaurants();
        let actualRestaurantsApi = restaurantsApi.data?.length;
        const restaurantsUi = await resturantPage.countRestaurants();

        //Assert
        expect(restaurantsUi).to.equal(actualRestaurantsApi);
    });
})


