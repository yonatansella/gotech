import { ApiResponse } from '../infra/rest/api-response';
import { Restaurant } from '../logic/REST/API-Response/get-restaurants-response';
import { expect } from 'chai';


import restaurantsAPI from '../logic/REST/restaurantsAPI';

describe('Restaurants tests', () => {

    before('Reset restaurant server', async () => {
        //Arrange
        await restaurantsAPI.resetServer();
    });

    it('Validate the amount of restaurants', async () => {
        //Act
        const restaurants: ApiResponse<Restaurant[]> = await restaurantsAPI.getRestaurants();

        //Assert
        expect(restaurants.success).to.be.true;
        const actualAmount = restaurants.data?.length;
        expect(actualAmount).to.equal(3, 'Restaurants amount is not as expected');
    });

    it('Create and then get restaurant by id', async () => {
        //Arrange
        const myNewRest = { address: "My Addess 1", id: 233, name: "name by api", score: 2.3 };
        const createResponse = await restaurantsAPI.createRestaurant(myNewRest);

        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(233);

        //Assert
        expect(getByIdResponse.status).to.equal(200);
        expect(getByIdResponse.success).to.be.true;
        expect(getByIdResponse.data).to.deep.equal(myNewRest);
    });

    it('Edit restaurant by id', async () => {
        //Arrange
        const myUpdatedRest = { address: "localhost", id: 555, score: 5.5 };

        //Act
        const patchByIdResponse = await restaurantsAPI.patchRestaurantById(233, myUpdatedRest);

        //Assert
        expect(patchByIdResponse.status).to.equal(200);
        expect(patchByIdResponse.success).to.be.true;
        //BUG ahead - patch partly succeeded (cannot update "score" for no reason)
        expect(patchByIdResponse.data).to.deep.equal(myUpdatedRest);
    });

    it('Delete restaurant by id', async () => {
        //Act
        const deleteByIdResponse = await restaurantsAPI.deleteRestaurantById(555);

        //Assert
        expect(deleteByIdResponse.status).to.equal(200);
        expect(deleteByIdResponse.success).to.be.true;
    });

    it('Get non exsisting restaurant', async () => {
        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(555);

        //Assert
        expect(getByIdResponse.error).to.equal("restaurant with given id not found");
        expect(getByIdResponse.success).to.be.false;
        expect(getByIdResponse.status).to.equal(404);
    });

});