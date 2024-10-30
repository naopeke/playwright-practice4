//https://www.automationexercise.com/api_list

import { test, expect, APIRequestContext } from '@playwright/test';
import ProductPage from '../pom/productPage';

test.describe('Automation Exercise', ()=>{

    let productPage: ProductPage;

    //テストが始まるたびに新しいProductPageインスタンスを作成し、requestコンテキストを渡すことで、各テストでAPIリクエストを行う準備をします。
    test.beforeEach(async ({ request }: { request: APIRequestContext }) => {
        productPage = new ProductPage(request);
    });

    test('API 1: Get All Products List', async ({ request })=>{
        // const response = await request.get('https://automationexercise.com/api/productsList');
        const response = await productPage.getAllProducts();
        expect(response.status()).toBe(200);
        
        const json = await response.json();
        console.log(json);
    });

    test('API 2: POST To All Products List', async({ request})=>{
        const response = await request.post('https://automationexercise.com/api/productsList');
        expect (response.status()).toBe(405);
        
        const json = await response.json();
        expect(json).toHaveProperty('This request method is not supported.');
    })

    test('API 3: Get All Brands List', async ({ request })=>{
        const response = await request.get('https://automationexercise.com/api/brandsList');
        expect(response.status()).toBe(200);

        const json = await response.json();
        console.log(json);
    })

    test('API 4: PUT To All Brands List', async ({ request })=>{
        const response = await  request.put('https://automationexercise.com/api/brandsList');
        expect(response.status()).toBe(405);

        const json = await response.json();
        expect(json).toHaveProperty('This request method is not supported.');
    })

    test('API 5: POST To Search Product', async ({ request })=>{
        const response = await request.post('https://automationexercise.com/api/searchProduct', {
            data: {
                search_product : 'tshirt'
            }
        });

        expect(response.status()).toBe(200);
        const json = await response.json();
        console.log(json);
    })

    test('API 6: POST To Search Product without search_product parameter', async ({ request })=>{
        const response = await request.post('https://automationexercise.com/api/searchProduct', {
            data : {}
        });

        expect(response.status()).toBe(400);
        const json = await response.json();
        expect(json).toHaveProperty('Bad request, search_product parameter is missing in POST request.');
    })

    test('API 7: POST To Verify Login with valid details', async ({ request })=>{
        const response = await request.post('https://automationexercise.com/api/verifyLogin', {
            data : {
                email : 'test@example.com',
                password : '123456'
            }
        });

        expect(response.status()).toBe(200);
        const json = await response.json();
        expect(json).toHaveProperty('User exists!');
    })

    test('API 8: POST To Verify Login without email parameter', async({ request })=>{
        const response = await request.post('https://automationexercise.com/api/verifyLogin', {
            data : {
                password : '123456'
            }
        });

        expect(response.status()).toBe(400);
        const json = await response.json();
        expect(json).toHaveProperty('Bad request, email or password parameter is missing in POST request.');
    })

    test('API 9: DELETE To Verify Login', async ({ request })=>{
        const response = await request.delete('https://automationexercise.com/api/verifyLogin');
        expect(response.status()).toBe(405);
        const json = await response.json();
        expect(json).toHaveProperty('This request method is not supported.');
    })

    test('API 10: POST To Verify Login with invalid details', async({ request })=>{
        const response = await request.post('https://automationexercise.com/api/verifyLogin', {
            data : {
                email: 'test@example.com',
                password: '123'
        }
        });

        expect(response.status()).toBe(404);
        const json = await response.json();
        expect(json).toHaveProperty('User not found!');
    })
})