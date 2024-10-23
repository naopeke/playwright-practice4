import { test, expect } from '@playwright/test';
import exp from 'constants';

test('API GET Request', async ({ request })=>{
    const response = await request.get('https://reqres.in/api/users/2');
    
    expect(response.status()).toBe(200);
    
    const body = await response.text();
    expect(body).toContain('Janet');
    
    console.log(await response.json());
})

test('API POST Request_01', async ({ request })=>{
    const response = await request.post('https://reqres.in/api/users',{
        data:
            {
                "name": "Lati",
                "job": "manager"
            }
    });
    expect(response.status()).toBe(201);
    const body = await response.text();
    expect(body).toContain('Lati');
    console.log(await response.json());
})

test('API POST Request_02', async ({ request })=>{
    const response = await request.post('https://reqres.in/api/register', {
        data : 
        {
            "email": "sydney@fife"
        }
    });

    expect(response.status()).toBe(400);

    const jsonResponse = await response.json();
    expect (jsonResponse).toHaveProperty('error');
    expect (jsonResponse.error).toBe('Missing password');
    console.log(jsonResponse);

})

test('API PUT Request', async ({ request })=>{
    const response = await request.put('https://reqres.in/api/users/2',{
        data : 
        {
            "name": "Lati",
            "job": "Tester"
        }
    });
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('Tester');
    console.log(await response.json());
})

test('API DELETE Request', async({ request })=>{
    const response = await request.delete('https://reqres.in/api/users/2');
    expect(response.status()).toBe(204);
    const body = await response.text();
    expect(body).toBe('');
})