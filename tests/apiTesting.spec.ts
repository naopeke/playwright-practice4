import { test, expect } from '@playwright/test';
import exp from 'constants';

test('API GET Request', async ({ request })=>{
    const response = await request.get('https://reqres.in/api/users/2');
    
    expect(response.status()).toBe(200);
    
    const text = await response.text();
    expect(text).toContain('Janet');
    
    console.log(await response.json());
})

test('API POST Request', async ({ request })=>{
    const response = await request.post('https://reqres.in/api/users',{
        data:
            {
                "name": "Lati",
                "job": "manager"
            }
    });
    expect(response.status()).toBe(201);
    const text = await response.text();
    expect(text).toContain('Lati');
    console.log(await response.json());
})