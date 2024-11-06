import { APIRequestContext } from "@playwright/test";

class ProductPage {
    private request : APIRequestContext;

    constructor(request: APIRequestContext){
        this.request = request;
    }

    async getAllProducts(){
        const response = await this.request.get('https://automationexercise.com/api/productsList');
        return response;
    }

    async postToProductsList(data: Record<string, any>){
        const response = await this.request.post('https://automationexercise.com/api/productsList', { data });
        return response;
    }

    async getAllBrands(){
        const response = await this.request.get('https://automationexercise.com/api/brandsList');
        return response;
    }

    async putAllBrands(){
        const response = await this.request.post('https://automationexercise.com/api/brandsList');
        return response;
    }

    async postSearchProducts(data: Record<string, any>){
        const response = await this.request.post('https://automationexercise.com/api/searchProduct', { data });
        return response;
    }

    async postSearchProductsWithoutParam(){
        const response = await this.request.post('https://automationexercise.com/api/searchProduct');
        return response;
    }

    async postToVerifyLogin(data: Record<string, any>){
        const response = await this.request.post('https://automationexercise.com/api/verifyLogin', { data });
        return response;
    }

    async postToVerifyLoginWitoutParam(){
        const response = await this.request.post('https://automationexercise.com/api/verifyLogin');
        return response;
    }
    
    async deleteVeryfyLogin(){
        const response = await this.request.delete('https://automationexercise.com/api/verifyLogin');
        return response;
    }

    async postToVerifyLoginWithInvalidData(data:Record<string,any>){
        const response = await this.request.post('https://automationexercise.com/api/verifyLogin', { data })
    }
}

export default ProductPage;