// https://playwright.dev/docs/mock
import { test, expect } from '@playwright/test';

test('static content on movie and dynamic votes through mocking', {
    tag: '@mocking',
}, async ({ page }) => {
    await page.route (
        '*/**/**718821?append_to_response=videos',
        async (route)=> {
            const response = await route.fetch();
            const json = await response.json();
            json.vote_average = 7.02;

            await route.fulfill({ response, json });
        }
    );

    await page.goto('movie?id=718221&page=1')
}
)