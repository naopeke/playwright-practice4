import { APIRequestContext, APIResponse, expect } from "@playwright/test";

class ProductPage {
    private request : APIRequestContext;

    constructor(request: APIRequestContext){
        this.request = request;
    }

    async verifyResponse(response: APIResponse, statusCode: number){
        expect(response.status()).toBe(statusCode);
    }

    async verifyJson(response: APIResponse){
        const json = await response.json();
        console.log(json);
        return json;
    }

    //1
    async getAllProducts(){
        const response = await this.request.get('https://automationexercise.com/api/productsList');
        return response;
    }

    //2
    async postToProductsList(data: Record<string, any>){
        const response = await this.request.post('https://automationexercise.com/api/productsList', { data });
        return response;
    }

    //3
    async getAllBrands(){
        const response = await this.request.get('https://automationexercise.com/api/brandsList');
        return response;
    }

    //4
    async putAllBrands(){
        const response = await this.request.post('https://automationexercise.com/api/brandsList');
        return response;
    }

    //5
    async postSearchProducts(data: Record<string, any>){
        const response = await this.request.post('https://automationexercise.com/api/searchProduct', { data });
        return response;
    }

    //6
    async postSearchProductsWithoutParam(){
        const response = await this.request.post('https://automationexercise.com/api/searchProduct');
        return response;
    }

    //7
    async postToVerifyLogin(data: Record<string, any>){
        const response = await this.request.post('https://automationexercise.com/api/verifyLogin', { data });
        return response;
    }

    //8
    async postToVerifyLoginWitoutParam(){
        const response = await this.request.post('https://automationexercise.com/api/verifyLogin');
        return response;
    }
    
    //9
    async deleteVeryfyLogin(){
        const response = await this.request.delete('https://automationexercise.com/api/verifyLogin');
        return response;
    }

    //10
    async postToVerifyLoginWithInvalidData(data:Record<string,any>){
        const response = await this.request.post('https://automationexercise.com/api/verifyLogin', { data });
        return response;
    }

    //11
    async postUserAccount(data:Record<string,any>){
        const response = await this.request.post('https://automationexercise.com/api/createAccount', { data });
        return response;
    }

    //12
    async deleteUserAccount(data:Record<string, any>){
        const response = await this.request.delete('https://automationexercise.com/api/deleteAccount', { data });
        return response;
    }

}

export default ProductPage;