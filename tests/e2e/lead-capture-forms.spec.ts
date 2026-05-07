import { test, expect } from '@playwright/test';
import { waitForAppReady, dismissToasts } from '../fixtures/helpers';

test.describe('Lead Capture and Form Submissions', () => {
  test.beforeEach(async ({ page }) => {
    await dismissToasts(page);
    // Set localStorage to dismiss newsletter popup
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.setItem('newsletterPopupDismissed', 'true'));
  });

  test('should open lead capture modal from hero Get Started button', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Click Get Started in hero
    await page.getByTestId('hero-get-started-btn').click();
    
    // Modal should open - look for the modal container
    await expect(page.locator('[role="dialog"]').first()).toBeVisible({ timeout: 5000 });
  });

  test('should open lead capture modal from navbar Get Started button', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Click Get Started in navbar
    await page.getByTestId('nav-get-started-btn').click();
    
    // Modal should open
    await expect(page.locator('[role="dialog"]').first()).toBeVisible({ timeout: 5000 });
  });

  test('should navigate to quote page from services dropdown', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Hover over Services
    await page.getByTestId('nav-services-dropdown').hover();
    
    // Wait for dropdown to appear
    await expect(page.getByTestId('nav-dropdown-get-a-quote')).toBeVisible();
    
    // Click on Get a Quote
    await page.getByTestId('nav-dropdown-get-a-quote').click();
    
    // Should be on quote page
    await expect(page).toHaveURL(/\/quote/);
  });

  test('should navigate to booking page', async ({ page }) => {
    await page.goto('/booking', { waitUntil: 'domcontentloaded' });
    
    // Booking page should load - check for the h1 title
    await expect(page.locator('h1').getByText('Schedule a Consultation')).toBeVisible();
  });

  test('should navigate to FAQ page', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Hover over Resources dropdown
    await page.getByTestId('nav-resources-dropdown').hover();
    
    // Wait for dropdown
    await expect(page.getByTestId('nav-dropdown-faq')).toBeVisible();
    
    // Click FAQ
    await page.getByTestId('nav-dropdown-faq').click();
    
    // Should be on FAQ page
    await expect(page).toHaveURL(/\/faq/);
    // Look for the main heading "Frequently Asked Questions"
    await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i }).first()).toBeVisible();
  });

  test('should navigate to Portfolio page', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Hover over Resources dropdown
    await page.getByTestId('nav-resources-dropdown').hover();
    
    // Click Portfolio
    await page.getByTestId('nav-dropdown-portfolio').click();
    
    // Should be on Portfolio page
    await expect(page).toHaveURL(/\/portfolio/);
  });

  test('should navigate to Blog page', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Hover over Resources dropdown
    await page.getByTestId('nav-resources-dropdown').hover();
    
    // Click Blog
    await page.getByTestId('nav-dropdown-blog').click();
    
    // Should be on Blog page
    await expect(page).toHaveURL(/\/blog/);
  });

  test('should navigate to Services page from Learn More button', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Click Learn More in hero
    await page.getByTestId('hero-learn-more-btn').click();
    
    // Should be on services page
    await expect(page).toHaveURL(/\/services/);
  });
});
