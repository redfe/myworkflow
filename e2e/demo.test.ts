import { expect, test } from '@playwright/test';

test('home page has expected ホーム', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('ホーム', { exact: false }).first()).toBeVisible();
});
