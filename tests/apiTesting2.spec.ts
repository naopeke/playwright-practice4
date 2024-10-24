//https://www.automationexercise.com/api_list

import { test, expect } from '@playwright/test';

test.describe('Automation Exercise', ()=>{

    test('API 1: Get All Products List', async ({ request })=>{
        const response = await request.get('https://automationexercise.com/api/productsList');
        expect (response.status()).toBe(200);
        
        const json = await response.json();
        console.log(json);
    });

    test('API 2: POST To All Products List', async({ request})=>{
        const response = await request.post('https://automationexercise.com/api/productsList');
        expect (response.status()).toBe(405);
        
        const json = await response.json();
        expect(json).toHaveProperty('This request method is not supported.');
    })
})