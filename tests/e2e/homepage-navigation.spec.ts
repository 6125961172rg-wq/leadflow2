import { test, expect } from '@playwright/test';
import { waitForAppReady, dismissToasts } from '../fixtures/helpers';

test.describe('Homepage and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await dismissToasts(page);
  });

  test('should render homepage with hero section', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Hero section should be visible
    await expect(page.getByTestId('hero-section')).toBeVisible();
    
    // Hero heading
    await expect(page.getByRole('heading', { name: /Transform Your Business Today/i })).toBeVisible();
    
    // CTA buttons
    await expect(page.getByTestId('hero-get-started-btn')).toBeVisible();
    await expect(page.getByTestId('hero-learn-more-btn')).toBeVisible();
    
    // Hero image
    await expect(page.getByTestId('hero-image')).toBeVisible();
  });

  test('should have navbar with all navigation links', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Navbar should be visible
    await expect(page.getByTestId('main-navbar')).toBeVisible();
    
    // Logo
    await expect(page.getByTestId('nav-logo')).toBeVisible();
    
    // Navigation links
    await expect(page.getByTestId('nav-home')).toBeVisible();
    await expect(page.getByTestId('nav-about')).toBeVisible();
    await expect(page.getByTestId('nav-services-dropdown')).toBeVisible();
    await expect(page.getByTestId('nav-resources-dropdown')).toBeVisible();
    await expect(page.getByTestId('nav-pricing')).toBeVisible();
    await expect(page.getByTestId('nav-contact')).toBeVisible();
    
    // Get Started button
    await expect(page.getByTestId('nav-get-started-btn')).toBeVisible();
    
    // Dark mode toggle
    await expect(page.getByTestId('dark-mode-toggle')).toBeVisible();
  });

  test('should navigate to About page', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    await page.getByTestId('nav-about').click();
    await expect(page).toHaveURL(/\/about/);
    
    // About page content should be visible
    await expect(page.getByTestId('about-heading')).toBeVisible();
  });

  test('should navigate to Pricing page', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    await page.getByTestId('nav-pricing').click();
    await expect(page).toHaveURL(/\/pricing/);
    
    // Pricing page content should be visible
    await expect(page.getByRole('heading', { name: /Pricing/i }).first()).toBeVisible();
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    await page.getByTestId('nav-contact').click();
    await expect(page).toHaveURL(/\/contact/);
    
    // Contact page should have form elements
    await expect(page.getByRole('heading', { name: /Contact/i }).first()).toBeVisible();
  });

  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Get initial state
    const darkModeToggle = page.getByTestId('dark-mode-toggle');
    
    // Click to toggle
    await darkModeToggle.click();
    
    // Wait for transition
    await page.waitForTimeout(500);
    
    // Toggle back
    await darkModeToggle.click();
  });

  test('should have footer with all sections', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Scroll to footer
    await page.getByTestId('main-footer').scrollIntoViewIfNeeded();
    
    // Footer should be visible
    await expect(page.getByTestId('main-footer')).toBeVisible();
    
    // Admin link in footer
    await expect(page.getByTestId('footer-admin-link')).toBeVisible();
    
    // Company info
    await expect(page.getByText('YourBrand').first()).toBeVisible();
  });

  test('should navigate to admin login from footer', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Scroll to footer and click admin link
    await page.getByTestId('footer-admin-link').scrollIntoViewIfNeeded();
    await page.getByTestId('footer-admin-link').click();
    
    // Should be on admin login page
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByTestId('admin-login-page')).toBeVisible();
  });

  test('should open services dropdown', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Hover over Services dropdown
    const servicesDropdown = page.getByTestId('nav-services-dropdown');
    await servicesDropdown.hover();
    
    // Dropdown items should appear
    await expect(page.getByTestId('nav-dropdown-all-services')).toBeVisible();
    await expect(page.getByTestId('nav-dropdown-get-a-quote')).toBeVisible();
  });

  test('should show stats on homepage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Stats should be visible
    await expect(page.getByTestId('stat-0')).toBeVisible();
    await expect(page.getByTestId('stat-1')).toBeVisible();
    await expect(page.getByTestId('stat-2')).toBeVisible();
    await expect(page.getByTestId('stat-3')).toBeVisible();
  });
});
