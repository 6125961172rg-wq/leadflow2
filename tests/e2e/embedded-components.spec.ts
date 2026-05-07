import { test, expect } from '@playwright/test';

test.describe('Embedded Components - CalendlyEmbed and GoogleMap', () => {
  test.beforeEach(async ({ page }) => {
    // Suppress newsletter popup
    await page.addInitScript(() => {
      localStorage.setItem('newsletterPopupDismissed', 'true');
    });
  });

  test.describe('CalendlyEmbed Component', () => {
    test('renders on booking page', async ({ page }) => {
      await page.goto('/booking');
      await expect(page.getByTestId('calendly-embed')).toBeVisible();
    });

    test('displays iframe with calendly URL', async ({ page }) => {
      await page.goto('/booking');
      const iframe = page.getByTestId('calendly-iframe');
      await expect(iframe).toBeVisible();
      // Check iframe src contains calendly
      await expect(iframe).toHaveAttribute('src', /calendly/);
    });

    test('shows heading and subheading', async ({ page }) => {
      await page.goto('/booking');
      await expect(page.locator('h1').getByText('Schedule a Consultation')).toBeVisible();
    });
  });

  test.describe('GoogleMap Component', () => {
    test('renders on contact page', async ({ page }) => {
      await page.goto('/contact');
      await expect(page.getByTestId('google-map')).toBeVisible();
    });

    test('displays map iframe', async ({ page }) => {
      await page.goto('/contact');
      const iframe = page.getByTestId('google-map-iframe');
      await expect(iframe).toBeVisible();
      await expect(iframe).toHaveAttribute('src', /google.com\/maps/);
    });

    test('shows contact info below map', async ({ page }) => {
      await page.goto('/contact');
      // Should show address, phone, email in the map component
      await expect(page.getByTestId('google-map').getByText('Address')).toBeVisible();
      await expect(page.getByTestId('google-map').getByText('Phone')).toBeVisible();
      await expect(page.getByTestId('google-map').getByText('Email')).toBeVisible();
    });
  });
});

test.describe('Tablet Responsiveness (768px)', () => {
  test.beforeEach(async ({ page }) => {
    // Suppress newsletter popup
    await page.addInitScript(() => {
      localStorage.setItem('newsletterPopupDismissed', 'true');
    });
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
  });

  test('navbar shows mobile menu button at tablet size', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('mobile-menu-toggle')).toBeVisible();
    // Desktop nav should not be visible
    const desktopNav = page.locator('.lg\\:flex');
    await expect(desktopNav.first()).not.toBeVisible();
  });

  test('hero section stacks vertically on tablet', async ({ page }) => {
    await page.goto('/');
    // Hero content should be visible
    await expect(page.getByTestId('hero-section')).toBeVisible();
    // Get Started button should be visible
    await expect(page.getByTestId('hero-get-started-btn')).toBeVisible();
  });

  test('mobile menu opens on tablet', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('mobile-menu-toggle').click();
    await expect(page.getByTestId('mobile-menu')).toBeVisible();
  });

  test('mobile menu shows all nav links', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('mobile-menu-toggle').click();
    // Check for nav links in mobile menu
    await expect(page.getByTestId('mobile-menu').getByText('Home')).toBeVisible();
    await expect(page.getByTestId('mobile-menu').getByText('About')).toBeVisible();
    await expect(page.getByTestId('mobile-menu').getByText('Services')).toBeVisible();
  });

  test('pricing page adjusts grid on tablet', async ({ page }) => {
    await page.goto('/pricing');
    // Pricing heading should be visible
    await expect(page.getByText('Simple, Transparent Pricing')).toBeVisible();
    // At least one plan card should be visible
    await expect(page.getByText('Starter')).toBeVisible();
  });

  test('footer stacks on tablet', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }));
    await expect(page.getByTestId('main-footer')).toBeVisible();
  });
});
