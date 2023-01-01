import { ApiResponse } from '../../infra/rest/api-response';
import HttpRequest from '../../infra/rest/network-request';
import { OptionalRestaurant, Restaurant } from "./API-Response/get-restaurants-response";
import jsonConfig from '../../../config.json';

const baseUrl = jsonConfig.baseUrl + '/';

const getRestaurants = async (): Promise<ApiResponse<Restaurant[]>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurants', method: HttpRequest.HttpMethod.GET, });

};

const resetServer = async (): Promise<ApiResponse<null>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'reset', method: HttpRequest.HttpMethod.POST, });

};

const createRestaurant = async (body: Restaurant): Promise<ApiResponse<null>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurant', method: HttpRequest.HttpMethod.POST, body: body });
};

const getRestaurantById = async (id: number): Promise<ApiResponse<Restaurant[]>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurant', method: HttpRequest.HttpMethod.GET, queryParams: { id: id } });
};

const patchRestaurantById = async (id: number, newBody: OptionalRestaurant): Promise<ApiResponse<null>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurant' + '/' + id, method: HttpRequest.HttpMethod.PATCH, body: newBody });
};

const deleteRestaurantById = async (id: number): Promise<ApiResponse<Restaurant[]>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurant' + '/' + id, method: HttpRequest.HttpMethod.DELETE });
};

export default { getRestaurants, resetServer, createRestaurant, getRestaurantById, patchRestaurantById, deleteRestaurantById };