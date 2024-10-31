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
}

export default ProductPage;