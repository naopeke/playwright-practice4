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
        
        await productPage.verifyResponse(response, 200);
        
        await productPage.verifyJson(response);
    });

    test('API 2: POST To All Products List', async({ request})=>{
        const response = await productPage.postToProductsList({});

        await productPage.verifyResponse(response, 405);
        
        await productPage.verifyJsonProperty(response, 'This request method is not supported.');
    })

    test('API 3: Get All Brands List', async ({ request })=>{
        const response = await productPage.getAllBrands();
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

    test('API 11: POST To Create/Register User Account', async({ request })=>{
        const response = await request.post('https://automationexercise.com/api/createAccount', {
            data: {
                name:'taro',
                email: 'test@example.com',
                password: '12345',
                title: 'Mr',
                birth_date: 10,
                birth_month: 10,
                birth_year: 1990,
                firstname: 'John',
                lastname: 'Doe',
                company: 'Iberia',
                address1: 'Calle Larios',
                address2: 'Portal3, 5-1',
                country: 'Spain',
                zipcode: 29004,
                state: 'Málaga',
                city: 'Málaga',
                mobile_number: 34910000000
            }
        });
        expect(response.status()).toBe(201);
        const json = response.json();
        expect(json).toHaveProperty('User created!');
    })

    test('API 12: DELETE METHOD To Delete User Account', async({ request })=>{
        const response = await request.delete('https://automationexercise.com/api/deleteAccount', {
            data: {
                email: 'test@example.com',
                password: '12345'
            }
        })
        expect(response.status()).toBe(200);
        const json = response.json();
        expect(json).toHaveProperty('Account deleted!');
    })

    test('API 13: PUT METHOD To Update User Account', async({ request })=>{
        const response = await request.put('https://automationexercise.com/api/updateAccount', {
            data: {
                name:'taro',
                email: 'test@example.com',
                password: '54321',
                title: 'Mrs',
                birth_date: 1,
                birth_month: 1,
                birth_year: 1991,
                firstname: 'Jane',
                lastname: 'Does',
                company: 'Iberdorola',
                address1: 'Calle Marqués de Larios',
                address2: 'Portal1, 1-1',
                country: 'Spain',
                zipcode: 29005,
                state: 'Málaga',
                city: 'Málaga',
                mobile_number: 34910000001
            }
        })
        expect(response.status()).toBe(200);
        const json = response.json();
        expect(json).toHaveProperty('User updated!');
    })

    test('API 14: GET user account detail by email', async({ request })=>{
        const response = await request.get('https://automationexercise.com/api/getUserDetailByEmail', {
            data: {
                email:'test@example.com'
            }
        })
        expect(response.status()).toBe(200);
        const json = response.json();
        expect(json).toHaveProperty('User Detail');

    })
})