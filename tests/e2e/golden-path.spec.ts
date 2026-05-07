import { test, expect } from '@playwright/test';
import { loginAsAdmin, logoutAdmin } from '../fixtures/helpers';

test.describe('Golden Path - End to End User Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Set up: dismiss newsletter popup
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.setItem('newsletterPopupDismissed', 'true'));
  });

  test('Homepage to Admin Dashboard journey', async ({ page }) => {
    // 1. Start on Homepage
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Verify homepage loaded
    await expect(page.getByTestId('hero-section')).toBeVisible();
    await expect(page.getByTestId('main-navbar')).toBeVisible();
    
    // 2. Navigate to footer and click Admin link
    await page.getByTestId('footer-admin-link').scrollIntoViewIfNeeded();
    await page.getByTestId('footer-admin-link').click();
    
    // 3. Login as admin
    await expect(page.getByTestId('admin-login-page')).toBeVisible();
    await page.getByTestId('admin-email-input').fill('admin@example.com');
    await page.getByTestId('admin-password-input').fill('test1234');
    await page.getByTestId('admin-login-submit').click();
    
    // 4. Verify dashboard loaded with data
    await expect(page.getByTestId('admin-dashboard')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Dashboard')).toBeVisible();
    
    // Check stats are visible
    await expect(page.getByText('Total Leads').first()).toBeVisible();
    
    // 5. Navigate through tabs
    await page.getByTestId('admin-tab-leads').click();
    await expect(page.getByTestId('leads-search-input')).toBeVisible();
    
    await page.getByTestId('admin-tab-quotes').click();
    await expect(page.getByTestId('quotes-search-input')).toBeVisible();
    
    await page.getByTestId('admin-tab-newsletter').click();
    
    // 6. Return to Overview
    await page.getByTestId('admin-tab-dashboard').click();
    await expect(page.getByText('Lead Pipeline')).toBeVisible();
    
    // 7. Logout
    await page.getByTestId('admin-logout-btn').click();
    await expect(page.getByTestId('admin-login-page')).toBeVisible({ timeout: 5000 });
  });

  test('Navigation through all main pages', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // About
    await page.getByTestId('nav-about').click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByTestId('about-heading')).toBeVisible();
    
    // Services
    await page.getByTestId('nav-services-dropdown').hover();
    await page.getByTestId('nav-dropdown-all-services').click();
    await expect(page).toHaveURL(/\/services/);
    
    // Pricing
    await page.getByTestId('nav-pricing').click();
    await expect(page).toHaveURL(/\/pricing/);
    await expect(page.getByRole('heading', { name: /Pricing/i }).first()).toBeVisible();
    
    // Contact
    await page.getByTestId('nav-contact').click();
    await expect(page).toHaveURL(/\/contact/);
    
    // Back to Home
    await page.getByTestId('nav-home').click();
    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('hero-section')).toBeVisible();
  });

  test('Lead capture modal opens correctly', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Click Get Started button in hero
    await page.getByTestId('hero-get-started-btn').click();
    
    // Modal should be visible
    await expect(page.locator('[role="dialog"]').first()).toBeVisible({ timeout: 5000 });
    
    // Close modal by clicking backdrop or pressing escape
    await page.keyboard.press('Escape');
    
    // Now try from navbar
    await page.getByTestId('nav-get-started-btn').click();
    await expect(page.locator('[role="dialog"]').first()).toBeVisible({ timeout: 5000 });
  });

  test('Dark mode toggle works', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Get initial background
    const initialBg = await page.evaluate(() => 
      getComputedStyle(document.documentElement).getPropertyValue('--background')
    );
    
    // Toggle dark mode
    await page.getByTestId('dark-mode-toggle').click();
    
    // Wait for transition
    await page.waitForTimeout(300);
    
    // Get new background
    const newBg = await page.evaluate(() => 
      getComputedStyle(document.documentElement).getPropertyValue('--background')
    );
    
    // Should have changed (or dark class added)
    const hasDarkClass = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    
    // Toggle back
    await page.getByTestId('dark-mode-toggle').click();
    await page.waitForTimeout(300);
    
    const finalDarkClass = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    
    // Verify toggle works (either dark class was added/removed or background changed)
    expect(hasDarkClass !== finalDarkClass || initialBg !== newBg).toBeTruthy();
  });
});
