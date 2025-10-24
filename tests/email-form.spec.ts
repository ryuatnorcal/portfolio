import { test, expect } from '@playwright/test';

test.describe('Contact form', () => {
  test('submits successfully and clears inputs', async ({ page }) => {
    // Intercept the API to avoid real email sending
    await page.route('**/api/email', async (route) => {
      const req = route.request();
      if (req.method() === 'POST') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            status: 'success',
            data: { message: 'Email sent' },
          }),
        });
      }
      return route.continue();
    });
    await page.goto('/');
    await page.goto('/contact');

    await page.fill('input#email', 'john@example.com');
    await page.fill('input#name', 'John Doe');
    await page.fill('textarea#message', 'Hello from Playwright!');

    // The button text may be localized; fall back to selecting the only button in the form
    await page.click('form button');

    // Success message is localized via emailSuccessMessage[locale].
    // Assert the success container is visible instead of hardcoding text.
    await expect(page.getByText('Your message has been successfully sent. Thank you!')).toBeVisible()

    await expect(page.locator('input#email')).toHaveValue('');
    await expect(page.locator('input#name')).toHaveValue('');
    await expect(page.locator('textarea#message')).toHaveValue('');
  });

  test('shows error message when API returns error', async ({ page }) => {
    await page.route('**/api/email', async (route) => {
      if (route.request().method() === 'POST') {
        return route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            status: 'error',
            data: { message: 'Invalid Name' },
          }),
        });
      }
      return route.continue();
    });
    await page.goto('/');
    await page.goto('/contact');

    await page.fill('input#email', 'badname@test.com');
    await page.fill('input#name', '');
    await page.fill('textarea#message', 'Hello');

    await page.click('form button');

    await expect(page.getByText('Invalid Name')).toBeVisible()
    // Inputs are not automatically cleared on error; verify they still contain the values
    await expect(page.locator('input#email')).toHaveValue('badname@test.com');
    await expect(page.locator('input#name')).toHaveValue('');
    await expect(page.locator('textarea#message')).toHaveValue('Hello');
  });
});
