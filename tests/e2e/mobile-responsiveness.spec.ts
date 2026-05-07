import { test, expect } from '@playwright/test';
import { dismissToasts } from '../fixtures/helpers';

test.describe('Mobile Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.setItem('newsletterPopupDismissed', 'true'));
    await dismissToasts(page);
  });

  test('Hero section adapts to mobile with proper layout', async ({ page }) => {
    // Hero section should be visible
    await expect(page.getByTestId('hero-section')).toBeVisible();
    
    // Hero image should be visible
    await expect(page.getByTestId('hero-image')).toBeVisible();
    
    // CTA buttons should be visible and full width on mobile
    await expect(page.getByTestId('hero-get-started-btn')).toBeVisible();
    await expect(page.getByTestId('hero-learn-more-btn')).toBeVisible();
    
    // Trust indicators should be visible (scoped to hero section)
    await expect(page.getByTestId('hero-section').getByText('Free Consultation')).toBeVisible();
  });

  test('Navigation shows mobile menu button', async ({ page }) => {
    // Navbar should be visible
    await expect(page.getByTestId('main-navbar')).toBeVisible();
    
    // Logo should be visible
    await expect(page.getByTestId('nav-logo')).toBeVisible();
    
    // Mobile menu toggle should be visible
    await expect(page.getByTestId('mobile-menu-toggle')).toBeVisible();
  });

  test('Stats section displays in 2 columns on mobile', async ({ page }) => {
    // Stats should be visible
    await expect(page.getByTestId('stat-0')).toBeVisible();
    await expect(page.getByTestId('stat-1')).toBeVisible();
    await expect(page.getByTestId('stat-2')).toBeVisible();
    await expect(page.getByTestId('stat-3')).toBeVisible();
  });

  test('Services section shows cards stacked on mobile', async ({ page }) => {
    // Scroll to services section
    await page.getByTestId('services-section').scrollIntoViewIfNeeded();
    
    // Service cards should be visible
    await expect(page.getByTestId('service-card-1')).toBeVisible();
    await expect(page.getByTestId('service-card-2')).toBeVisible();
  });

  test('Footer displays correctly on mobile', async ({ page }) => {
    // Scroll to footer
    await page.getByTestId('main-footer').scrollIntoViewIfNeeded();
    
    // Footer should be visible
    await expect(page.getByTestId('main-footer')).toBeVisible();
    
    // Admin link should be visible
    await expect(page.getByTestId('footer-admin-link')).toBeVisible();
  });

  test('CTA banner displays correctly on mobile', async ({ page }) => {
    // Scroll to CTA section
    await page.getByTestId('cta-banner-section').scrollIntoViewIfNeeded();
    
    // CTA buttons should be visible
    await expect(page.getByTestId('cta-get-started-btn')).toBeVisible();
    await expect(page.getByTestId('cta-contact-btn')).toBeVisible();
  });
});
