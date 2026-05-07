import { Page, expect } from '@playwright/test';

export async function waitForAppReady(page: Page) {
  await page.waitForLoadState('domcontentloaded');
}

export async function dismissToasts(page: Page) {
  await page.addLocatorHandler(
    page.locator('[data-sonner-toast], .Toastify__toast, [role="status"].toast, .MuiSnackbar-root'),
    async () => {
      const close = page.locator('[data-sonner-toast] [data-close], [data-sonner-toast] button[aria-label="Close"], .Toastify__close-button, .MuiSnackbar-root button');
      await close.first().click({ timeout: 2000 }).catch(() => {});
    },
    { times: 10, noWaitAfter: true }
  );
}

export async function checkForErrors(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const errorElements = Array.from(
      document.querySelectorAll('.error, [class*="error"], [id*="error"]')
    );
    return errorElements.map(el => el.textContent || '').filter(Boolean);
  });
}

export async function clearLocalStorage(page: Page) {
  // Navigate to a page first before trying to access localStorage
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
  } catch (e) {
    // Ignore localStorage errors - Playwright isolates browser contexts anyway
  }
}

export async function loginAsAdmin(page: Page, email: string = 'admin@example.com', password: string = 'test1234') {
  // Dismiss newsletter popup by setting localStorage
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.setItem('newsletterPopupDismissed', 'true'));
  
  await page.goto('/admin/login', { waitUntil: 'domcontentloaded' });
  await page.getByTestId('admin-email-input').fill(email);
  await page.getByTestId('admin-password-input').fill(password);
  await page.getByTestId('admin-login-submit').click();
  // Wait for redirect to admin dashboard
  await expect(page.getByTestId('admin-dashboard')).toBeVisible({ timeout: 10000 });
}

export async function logoutAdmin(page: Page) {
  await page.getByTestId('admin-logout-btn').click();
  await expect(page.getByTestId('admin-login-page')).toBeVisible({ timeout: 5000 });
}
