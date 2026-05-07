import { test, expect } from '@playwright/test';

test.describe('Footer and Navbar Improvements', () => {
  test.beforeEach(async ({ page }) => {
    // Suppress newsletter popup
    await page.addInitScript(() => {
      localStorage.setItem('newsletterPopupDismissed', 'true');
    });
  });

  test.describe('Navbar Dropdown Hover', () => {
    test('Services dropdown opens on hover', async ({ page }) => {
      await page.goto('/');
      // Hover over Services dropdown trigger
      const servicesDropdown = page.getByTestId('nav-services-dropdown');
      await servicesDropdown.hover();
      // Dropdown items should be visible
      await expect(page.getByTestId('nav-dropdown-all-services')).toBeVisible();
      await expect(page.getByTestId('nav-dropdown-get-a-quote')).toBeVisible();
    });

    test('Resources dropdown opens on hover', async ({ page }) => {
      await page.goto('/');
      // Hover over Resources dropdown trigger
      const resourcesDropdown = page.getByTestId('nav-resources-dropdown');
      await resourcesDropdown.hover();
      // Dropdown items should be visible
      await expect(page.getByTestId('nav-dropdown-blog')).toBeVisible();
      await expect(page.getByTestId('nav-dropdown-faq')).toBeVisible();
      await expect(page.getByTestId('nav-dropdown-portfolio')).toBeVisible();
    });

    test('Services dropdown links navigate correctly', async ({ page }) => {
      await page.goto('/');
      await page.getByTestId('nav-services-dropdown').hover();
      await page.getByTestId('nav-dropdown-all-services').click();
      await expect(page).toHaveURL(/\/services/);
    });

    test('Resources dropdown Blog link navigates correctly', async ({ page }) => {
      await page.goto('/');
      await page.getByTestId('nav-resources-dropdown').hover();
      await page.getByTestId('nav-dropdown-blog').click();
      await expect(page).toHaveURL(/\/blog/);
    });

    test('Resources dropdown FAQ link navigates correctly', async ({ page }) => {
      await page.goto('/');
      await page.getByTestId('nav-resources-dropdown').hover();
      await page.getByTestId('nav-dropdown-faq').click();
      await expect(page).toHaveURL(/\/faq/);
    });

    test('Resources dropdown Portfolio link navigates correctly', async ({ page }) => {
      await page.goto('/');
      await page.getByTestId('nav-resources-dropdown').hover();
      await page.getByTestId('nav-dropdown-portfolio').click();
      await expect(page).toHaveURL(/\/portfolio/);
    });

    test('dropdown closes when mouse leaves', async ({ page }) => {
      await page.goto('/');
      await page.getByTestId('nav-services-dropdown').hover();
      await expect(page.getByTestId('nav-dropdown-all-services')).toBeVisible();
      // Move away
      await page.getByTestId('nav-home').hover();
      await expect(page.getByTestId('nav-dropdown-all-services')).not.toBeVisible();
    });
  });

  test.describe('Footer Improvements', () => {
    test('footer renders with newsletter subscription form', async ({ page }) => {
      await page.goto('/');
      // Scroll to footer
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }));
      await expect(page.getByTestId('main-footer')).toBeVisible();
      await expect(page.getByTestId('footer-newsletter-form')).toBeVisible();
      await expect(page.getByTestId('footer-newsletter-input')).toBeVisible();
      await expect(page.getByTestId('footer-newsletter-submit')).toBeVisible();
    });

    test('footer shows Stay in the loop newsletter section', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }));
      await expect(page.getByText('Stay in the loop')).toBeVisible();
    });

    test('footer has Company links column', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }));
      await expect(page.getByRole('heading', { name: 'Company' })).toBeVisible();
      // Should have company links
      const companyLinks = page.locator('a', { hasText: 'Home' }).filter({ hasText: /^Home$/ });
      await expect(companyLinks.first()).toBeVisible();
    });

    test('footer has Resources links column', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }));
      await expect(page.getByRole('heading', { name: 'Resources' })).toBeVisible();
    });

    test('footer has Get in Touch contact info', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }));
      await expect(page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible();
      await expect(page.getByTestId('footer-email')).toBeVisible();
      await expect(page.getByTestId('footer-phone')).toBeVisible();
      await expect(page.getByTestId('footer-address')).toBeVisible();
    });

    test('footer has social media links', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }));
      // Check for social icons (Facebook, Twitter, LinkedIn, Instagram)
      const socialLinks = page.locator('a[aria-label]');
      await expect(socialLinks.filter({ hasText: /Facebook/i }).or(page.locator('a[aria-label="Facebook"]'))).toBeVisible();
    });

    test('footer newsletter form submits successfully', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }));
      const testEmail = `test_footer_${Date.now()}@example.com`;
      await page.getByTestId('footer-newsletter-input').fill(testEmail);
      await page.getByTestId('footer-newsletter-submit').click();
      // Should show success message
      await expect(page.getByTestId('footer-newsletter-success')).toBeVisible({ timeout: 5000 });
      await expect(page.getByText("You're subscribed!")).toBeVisible();
    });

    test('footer has admin link', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }));
      await expect(page.getByTestId('footer-admin-link')).toBeVisible();
    });
  });
});
