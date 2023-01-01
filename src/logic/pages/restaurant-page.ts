import { expect } from "chai";
import { Page } from "playwright";
import { PageBase } from "./page-base";


const ITEMS = "tbody > tr";
const CREATE_NEW_RESTURANT_BUTTON = "//button[contains(text(),'Create new')]";
const CREATE_REST_POPUP_TITLE = "//h2[contains(text(),'Create new restaurant')]";
const SUBMIT_BUTTON = "//button[contains(text(),'Submit')]";

const SUCCESS_POPUP_TITLE = "//h2[contains(text(),'Created!')]";
const DELETE_POPUP_TITLE = "//h2[contains(text(),'Deleted!')]";
const POPUP_BUTTON = "//button[contains(text(),'OK')]";

const DELETE_ITEM = "//button[contains(text(),'X')]";
const ID_FIELD = `//*[@id="id"]`;
const NAME_FIELD = `//*[@id="name"]`;
const ADDRESS_FIELD = `//*[@id="address"]`;
const SCORE_FIELD = `//*[@id="score"]`;


export class RestaurantPage extends PageBase {

    constructor(page: Page) {
        super(page);
    }

    clickCreateNewRestaurantButton = async () => {
        await this.page.click(CREATE_NEW_RESTURANT_BUTTON);
    };

    checkIfTitleInPopupExist = async () => {
        return await this.page.isVisible(CREATE_REST_POPUP_TITLE);
    };

    countRestaurants = async () => {
        await this.page.waitForSelector(ITEMS);
        return await this.page.locator(ITEMS).count();
    };

    typeId = async (id: string) => {
        await this.typeText(ID_FIELD, id);
    };

    typeName = async (name: string) => {
        await this.typeText(NAME_FIELD, name);
    };

    typeAddress = async (address: string) => {
        await this.typeText(ADDRESS_FIELD, address);
    };

    typeScore = async (score: string) => {
        await this.typeText(SCORE_FIELD, score);
    };

    clickSubmit = async () => {
        await this.page.click(SUBMIT_BUTTON);
    };

    clickDeleteRestaurantByPositionOnList = async (eq: number) => {
        const item_by_position = `//*[@id="main-table"]/table/tbody/tr[${eq}]/td[6]/button`;
        await this.page.click(item_by_position);
    };

    checkIfAddedSuccessfully = async () => {
        this.verifyPopup(SUCCESS_POPUP_TITLE);
    };

    checkIfDeletedSuccessfully = async () => {
        this.verifyPopup(DELETE_POPUP_TITLE);
    };

    private verifyPopup = async (titleLocator: string) => {
        await this.page.isVisible(titleLocator);
        await this.page.click(POPUP_BUTTON);
    };

    private typeText = async (selector: string, text: string) => {
        await this.page.fill(selector, text);
        const actual = await this.page.locator(selector).inputValue();
        expect(actual).to.equal(text);
    };
}