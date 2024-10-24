// https://playwright.dev/docs/mock
// https://demo.playwright.dev/api-mocking/
import { test, expect } from '@playwright/test';

test.describe('Mock APIs', ()=>{

    test("mocks a fruit and doesn't call api", async ({ page })=>{
        await page.route('*/**/api/v1/fruits', async (route)=>{
            const json = [{ name: 'Strawberry', id: 21 }];
            await route.fulfill({json});
        })
        await page.goto('https://demo.playwright.dev/api-mocking');
        await expect(page.getByText('Strawberry')).toBeVisible();
    })


    test("gets the json from api and adds a new fruit", { tag: '@mocking',}, async ({ page }) => {
        await page.route ('*/**/api/v1/fruits', async (route)=> {
                const response = await route.fetch();
                const json = await response.json();
                json.push({ name: 'Loquat', id: 100 });
                await route.fulfill({ response, json });
            }
        );
        await page.goto('https://demo.playwright.dev/api-mocking');
        await expect(page.getByText('Loquat', {exact: true})).toBeVisible();
    }
    )

    
})
