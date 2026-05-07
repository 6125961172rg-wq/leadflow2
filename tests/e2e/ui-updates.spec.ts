import { test, expect } from '@playwright/test';
import { waitForAppReady, dismissToasts } from '../fixtures/helpers';

test.describe('UI Updates - Hero, Client Logos, Services, CTA', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate first, then set localStorage
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.setItem('newsletterPopupDismissed', 'true'));
    await dismissToasts(page);
  });

  test('Hero section renders with 3D sphere image and stats with counter animation', async ({ page }) => {
    // Hero section should be visible
    await expect(page.getByTestId('hero-section')).toBeVisible();
    
    // Hero image (3D sphere)
    await expect(page.getByTestId('hero-image')).toBeVisible();
    const heroImage = page.getByTestId('hero-image');
    const src = await heroImage.getAttribute('src');
    expect(src).toContain('emergentagent.com'); // New 3D sphere image from CDN
    
    // Stats section with counter animation
    await expect(page.getByTestId('stat-0')).toBeVisible();
    await expect(page.getByTestId('stat-1')).toBeVisible();
    await expect(page.getByTestId('stat-2')).toBeVisible();
    await expect(page.getByTestId('stat-3')).toBeVisible();
    
    // Verify stat labels using data-testid scoping (avoid duplicate matches)
    await expect(page.getByTestId('stat-0').getByText('Years Experience')).toBeVisible();
    await expect(page.getByTestId('stat-1').getByText('Happy Clients')).toBeVisible();
    await expect(page.getByTestId('stat-2').getByText('Projects Completed')).toBeVisible();
    await expect(page.getByTestId('stat-3').getByText('Success Rate')).toBeVisible();
  });

  test('Client logos marquee carousel renders and scrolls', async ({ page }) => {
    // Client logos section should be visible
    await expect(page.getByTestId('client-logos-section')).toBeVisible();
    
    // Scroll to client logos
    await page.getByTestId('client-logos-section').scrollIntoViewIfNeeded();
    
    // Check for "Trusted by leading companies" text
    await expect(page.getByText('Trusted by leading companies')).toBeVisible();
    
    // Verify at least some client logos are visible
    await expect(page.getByTestId('client-logo-0')).toBeVisible();
    await expect(page.getByTestId('client-logo-1')).toBeVisible();
    
    // Verify company names are displayed (use first() due to marquee duplication)
    await expect(page.getByText('TechCorp').first()).toBeVisible();
    await expect(page.getByText('GlobalBrands').first()).toBeVisible();
  });

  test('Services cards have vertical layout with icon on top and proper structure', async ({ page }) => {
    // Services section should be visible
    await expect(page.getByTestId('services-section')).toBeVisible();
    
    // Scroll to services section
    await page.getByTestId('services-section').scrollIntoViewIfNeeded();
    
    // Check section header
    await expect(page.getByText('Our Services')).toBeVisible();
    await expect(page.getByText('What We Do')).toBeVisible();
    
    // Verify all 4 service cards are visible
    await expect(page.getByTestId('service-card-1')).toBeVisible();
    await expect(page.getByTestId('service-card-2')).toBeVisible();
    await expect(page.getByTestId('service-card-3')).toBeVisible();
    await expect(page.getByTestId('service-card-4')).toBeVisible();
    
    // Verify service titles
    await expect(page.getByText('Consulting Services')).toBeVisible();
    await expect(page.getByText('Customer Support')).toBeVisible();
    await expect(page.getByText('Digital Solutions')).toBeVisible();
    await expect(page.getByText('Business Growth')).toBeVisible();
    
    // Verify Learn More links
    await expect(page.getByText('Learn more').first()).toBeVisible();
  });

  test('Why Choose Us section with Track Record card and counter animation', async ({ page }) => {
    // Why Choose Us section should be visible
    await expect(page.getByTestId('why-choose-us-section')).toBeVisible();
    
    // Scroll to section
    await page.getByTestId('why-choose-us-section').scrollIntoViewIfNeeded();
    
    // Section header
    await expect(page.getByRole('heading', { name: 'Why Choose Us' })).toBeVisible();
    await expect(page.getByText('Why Us', { exact: true })).toBeVisible();
    
    // Track Record card should be visible with header
    await expect(page.getByText('Our Track Record')).toBeVisible();
    await expect(page.getByText('Numbers that speak for themselves')).toBeVisible();
    
    // Verify why choose us items
    await expect(page.getByTestId('why-choose-0')).toBeVisible();
    await expect(page.getByTestId('why-choose-1')).toBeVisible();
    await expect(page.getByTestId('why-choose-2')).toBeVisible();
    await expect(page.getByTestId('why-choose-3')).toBeVisible();
    
    // Verify item titles using data-testid scoping
    await expect(page.getByTestId('why-choose-0').getByText('Proven Track Record')).toBeVisible();
    await expect(page.getByTestId('why-choose-1').getByText('Expert Team')).toBeVisible();
    await expect(page.getByTestId('why-choose-2').getByText('Customer First')).toBeVisible();
    await expect(page.getByTestId('why-choose-3').getByText('Innovative Solutions')).toBeVisible();
    
    // Track Record stat labels should be visible
    await expect(page.getByText('Client Satisfaction')).toBeVisible();
    await expect(page.getByText('Projects Delivered')).toBeVisible();
    await expect(page.getByText('Team Members')).toBeVisible();
  });

  test('Testimonials section with infinite carousel', async ({ page }) => {
    // Testimonials section should be visible
    await expect(page.getByTestId('testimonials-section')).toBeVisible();
    
    // Scroll to section
    await page.getByTestId('testimonials-section').scrollIntoViewIfNeeded();
    
    // Section header
    await expect(page.getByRole('heading', { name: 'What Our Clients Say' })).toBeVisible();
    
    // At least some testimonial cards should be visible (use first() due to carousel duplication)
    await expect(page.getByTestId('testimonial-1').first()).toBeVisible();
    
    // Verify testimonial content structure
    await expect(page.getByText('Michael Chen').first()).toBeVisible();
    await expect(page.getByText('Sarah Anderson').first()).toBeVisible();
    await expect(page.getByText('David Rodriguez').first()).toBeVisible();
  });

  test('CTA Banner section with indigo gradient distinct from footer', async ({ page }) => {
    // CTA Banner section should be visible
    await expect(page.getByTestId('cta-banner-section')).toBeVisible();
    
    // Scroll to section
    await page.getByTestId('cta-banner-section').scrollIntoViewIfNeeded();
    
    // CTA content
    await expect(page.getByText('Ready to Transform')).toBeVisible();
    await expect(page.getByText('Your Business?')).toBeVisible();
    await expect(page.getByText('Limited Time Offer', { exact: false })).toBeVisible();
    
    // CTA buttons
    await expect(page.getByTestId('cta-get-started-btn')).toBeVisible();
    await expect(page.getByTestId('cta-contact-btn')).toBeVisible();
    
    // Verify Contact Us button links to contact page
    await expect(page.getByTestId('cta-contact-btn')).toHaveAttribute('href', '/contact');
  });

  test('Footer is dark and distinct from CTA section', async ({ page }) => {
    // Footer should be visible
    await expect(page.getByTestId('main-footer')).toBeVisible();
    
    // Scroll to footer
    await page.getByTestId('main-footer').scrollIntoViewIfNeeded();
    
    // Footer content scoped to main-footer
    const footer = page.getByTestId('main-footer');
    await expect(footer.getByRole('heading', { name: 'YourBrand' })).toBeVisible();
    await expect(footer.getByRole('heading', { name: 'Company' })).toBeVisible();
    await expect(footer.getByRole('heading', { name: 'Resources' })).toBeVisible();
    await expect(footer.getByRole('heading', { name: 'Get in Touch' })).toBeVisible();
    
    // Admin link
    await expect(page.getByTestId('footer-admin-link')).toBeVisible();
    
    // Copyright
    await expect(page.getByText(/All rights reserved/)).toBeVisible();
  });

  test('CTA Get Started button opens lead capture modal', async ({ page }) => {
    // Scroll to CTA section
    await page.getByTestId('cta-banner-section').scrollIntoViewIfNeeded();
    
    // Click the Get Started Free button
    await page.getByTestId('cta-get-started-btn').click();
    
    // Lead capture modal should open - look for the modal heading
    await expect(page.getByRole('heading', { name: 'Get Started Today' })).toBeVisible();
  });
});
