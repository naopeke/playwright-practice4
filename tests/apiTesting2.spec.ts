//https://www.automationexercise.com/api_list

import { test, expect } from '@playwright/test';

test.describe('Automation Exercise', ()=>{

    test('API 1: Get All Products List', async ({ request })=>{
        const response = await request.get('https://automationexercise.com/api/productsList');
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
})