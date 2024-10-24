// https://playwright.dev/docs/mock
// https://demo.playwright.dev/api-mocking/
import { test, expect } from '@playwright/test';

test.describe('Mock APIs', ()=>{

    //特定のAPIエンドポイントへのリクエストをモックし、実際のAPIを呼び出さずに、ストロベリーのデータがページに表示されることを確認
    test("mocks a fruit and doesn't call api", async ({ page })=>{
        await page.route('*/**/api/v1/fruits', async (route)=>{
            const json = [{ name: 'Strawberry', id: 21 }];
            await route.fulfill({json});
            //この時点で、実際のAPIにはリクエストは送信されません。
        })
        //モックを設定した後、指定されたURLに移動し、ページ上に「Strawberry」というテキストが表示されているかを確認
        await page.goto('https://demo.playwright.dev/api-mocking');
        await expect(page.getByText('Strawberry')).toBeVisible();
    })


    //{ tag: '@mocking' }は、テストにタグを追加して、特定のテストをフィルタリングするのに使える情報
    test("gets the json from api and adds a new fruit", { tag: '@mocking',}, async ({ page }) => {
        
        await page.route ('*/**/api/v1/fruits', async (route)=> {

                //route.fetch()を呼び出して、実際のAPIからのレスポンスを取得
                const response = await route.fetch();
                //そのレスポンスをJSON形式に変換
                const json = await response.json();
                //json.push({ name: 'Loquat', id: 100 })で新しいフルーツ（ロクワット）を追加
                json.push({ name: 'Loquat', id: 100 });
                //route.fulfillを使って、修正されたJSONデータをレスポンスとして返す
                await route.fulfill({ response, json });
            }
        );
        await page.goto('https://demo.playwright.dev/api-mocking');
        await expect(page.getByText('Loquat', {exact: true})).toBeVisible();
    }
    )

    
})
