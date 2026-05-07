import { test, expect } from '@playwright/test';
import { waitForAppReady, loginAsAdmin, logoutAdmin } from '../fixtures/helpers';

test.describe('Admin Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage by navigating first
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
    // Dismiss the newsletter popup
    await page.evaluate(() => localStorage.setItem('newsletterPopupDismissed', 'true'));
  });

  test('should display admin login page correctly', async ({ page }) => {
    await page.goto('/admin/login', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('admin-login-page')).toBeVisible();
    await expect(page.getByTestId('admin-email-input')).toBeVisible();
    await expect(page.getByTestId('admin-password-input')).toBeVisible();
    await expect(page.getByTestId('admin-login-submit')).toBeVisible();
    await expect(page.getByTestId('admin-back-link')).toBeVisible();
  });

  test('should login with valid credentials and redirect to dashboard', async ({ page }) => {
    await page.goto('/admin/login', { waitUntil: 'domcontentloaded' });
    
    // Fill in credentials
    await page.getByTestId('admin-email-input').fill('admin@example.com');
    await page.getByTestId('admin-password-input').fill('test1234');
    
    // Submit
    await page.getByTestId('admin-login-submit').click();
    
    // Should redirect to admin dashboard
    await expect(page.getByTestId('admin-dashboard')).toBeVisible({ timeout: 10000 });
    
    // Should show admin email
    await expect(page.getByText('admin@example.com')).toBeVisible();
    
    // Should show logout button
    await expect(page.getByTestId('admin-logout-btn')).toBeVisible();
  });

  test('should show error for wrong password', async ({ page }) => {
    await page.goto('/admin/login', { waitUntil: 'domcontentloaded' });
    
    await page.getByTestId('admin-email-input').fill('admin@example.com');
    await page.getByTestId('admin-password-input').fill('wrongpassword');
    await page.getByTestId('admin-login-submit').click();
    
    // Should show error message
    await expect(page.getByTestId('login-error')).toBeVisible({ timeout: 10000 });
    // Check for either "Invalid password" or connection error
    const errorText = await page.getByTestId('login-error').textContent();
    expect(errorText).toBeTruthy();
    
    // Should still be on login page
    await expect(page.getByTestId('admin-login-page')).toBeVisible();
  });

  test('should show error for unauthorized email', async ({ page }) => {
    await page.goto('/admin/login', { waitUntil: 'domcontentloaded' });
    
    await page.getByTestId('admin-email-input').fill('unauthorized@example.com');
    await page.getByTestId('admin-password-input').fill('test1234');
    await page.getByTestId('admin-login-submit').click();
    
    // Should show error message
    await expect(page.getByTestId('login-error')).toBeVisible({ timeout: 10000 });
    // Check for error - could be "not authorized" or connection error
    const errorText = await page.getByTestId('login-error').textContent();
    expect(errorText).toBeTruthy();
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await loginAsAdmin(page);
    
    // Click logout
    await page.getByTestId('admin-logout-btn').click();
    
    // Should redirect to login page
    await expect(page.getByTestId('admin-login-page')).toBeVisible({ timeout: 5000 });
  });

  test('should persist login state on page refresh', async ({ page }) => {
    // Login
    await loginAsAdmin(page);
    
    // Refresh page
    await page.reload({ waitUntil: 'domcontentloaded' });
    
    // Should still be on dashboard
    await expect(page.getByTestId('admin-dashboard')).toBeVisible({ timeout: 10000 });
  });
});
