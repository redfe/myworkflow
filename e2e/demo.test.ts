import { expect, test } from '@playwright/test';

test('home page has expected Welcome', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('Welcome', { exact: false })).toBeVisible();
});
