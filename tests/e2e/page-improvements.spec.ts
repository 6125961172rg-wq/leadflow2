import { test, expect } from '@playwright/test';

test.describe('Page Improvements - About, Blog, FAQ, Portfolio', () => {
  test.beforeEach(async ({ page }) => {
    // Suppress newsletter popup
    await page.addInitScript(() => {
      localStorage.setItem('newsletterPopupDismissed', 'true');
    });
  });

  test.describe('About Page', () => {
    test('renders hero section with heading and badge', async ({ page }) => {
      await page.goto('/about');
      await expect(page.getByTestId('about-heading')).toBeVisible();
      await expect(page.getByTestId('about-heading')).toContainText('business growth');
      // Use more specific locator for the About badge
      await expect(page.locator('section').first().getByText('ABOUT US')).toBeVisible();
    });

    test('displays story section with image and floating badge', async ({ page }) => {
      await page.goto('/about');
      await expect(page.getByText('OUR STORY')).toBeVisible();
      await expect(page.getByText('From a bold idea to a trusted partner')).toBeVisible();
      // Check for image in story section
      const storyImage = page.locator('img[alt="Our team collaborating"]');
      await expect(storyImage).toBeVisible();
      // Check floating badge
      await expect(page.getByText('15+')).toBeVisible();
      await expect(page.getByText('Years of Excellence')).toBeVisible();
    });

    test('shows stats section with counter values', async ({ page }) => {
      await page.goto('/about');
      // Stats should show animated counter values
      await expect(page.getByText('Projects Completed')).toBeVisible();
      await expect(page.getByText('Happy Clients')).toBeVisible();
    });

    test('displays mission and vision cards', async ({ page }) => {
      await page.goto('/about');
      await expect(page.getByRole('heading', { name: 'Our Mission' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Our Vision' })).toBeVisible();
    });

    test('shows values section with value cards', async ({ page }) => {
      await page.goto('/about');
      await expect(page.getByText('What Drives Us')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Our Core Values' })).toBeVisible();
    });

    test('displays timeline/milestones section', async ({ page }) => {
      await page.goto('/about');
      await expect(page.getByText('Our Journey')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Key Milestones' })).toBeVisible();
      await expect(page.getByText('2010')).toBeVisible();
      await expect(page.getByText('Founded')).toBeVisible();
    });

    test('shows team section with member cards', async ({ page }) => {
      await page.goto('/about');
      await expect(page.getByTestId('team-section')).toBeVisible();
      await expect(page.getByText('Our People')).toBeVisible();
      await expect(page.getByTestId('team-member-0')).toBeVisible();
      // Check at least one team member
      await expect(page.getByText('Alex Morgan')).toBeVisible();
    });

    test('displays CTA section with contact and portfolio buttons', async ({ page }) => {
      await page.goto('/about');
      await expect(page.getByTestId('about-cta')).toBeVisible();
      await expect(page.getByTestId('about-cta-contact')).toBeVisible();
      await expect(page.getByTestId('about-cta-portfolio')).toBeVisible();
    });

    test('CTA buttons navigate correctly', async ({ page }) => {
      await page.goto('/about');
      // Test Contact Us button
      await page.getByTestId('about-cta-contact').click();
      await expect(page).toHaveURL(/\/contact/);
      
      // Go back and test Portfolio button
      await page.goto('/about');
      await page.getByTestId('about-cta-portfolio').click();
      await expect(page).toHaveURL(/\/portfolio/);
    });
  });

  test.describe('Blog Page', () => {
    test('renders blog page with heading and search', async ({ page }) => {
      await page.goto('/blog');
      await expect(page.getByTestId('blog-heading')).toBeVisible();
      await expect(page.getByTestId('blog-search')).toBeVisible();
    });

    test('displays featured post section', async ({ page }) => {
      await page.goto('/blog');
      await expect(page.getByTestId('featured-post')).toBeVisible();
      await expect(page.getByText('FEATURED')).toBeVisible();
    });

    test('shows category filter buttons', async ({ page }) => {
      await page.goto('/blog');
      await expect(page.getByTestId('blog-filter-all')).toBeVisible();
      await expect(page.getByTestId('blog-filter-digital-transformation')).toBeVisible();
    });

    test('category filter updates blog list', async ({ page }) => {
      await page.goto('/blog');
      // Click on a category
      await page.getByTestId('blog-filter-digital-transformation').click();
      // Featured should disappear when filtering
      await expect(page.getByTestId('featured-post')).not.toBeVisible();
      // Click All to reset
      await page.getByTestId('blog-filter-all').click();
      await expect(page.getByTestId('featured-post')).toBeVisible();
    });

    test('search filters articles', async ({ page }) => {
      await page.goto('/blog');
      await page.getByTestId('blog-search').fill('digital');
      // Featured should disappear when searching
      await expect(page.getByTestId('featured-post')).not.toBeVisible();
    });

    test('clicking blog card navigates to blog detail page', async ({ page }) => {
      await page.goto('/blog');
      // Click featured post
      await page.getByTestId('featured-post').click();
      // Should navigate to /blog/{slug}
      await expect(page).toHaveURL(/\/blog\/.+/);
    });
  });

  test.describe('Blog Detail Page', () => {
    test('renders blog detail with title and content', async ({ page }) => {
      await page.goto('/blog/digital-transformation-2025');
      await expect(page.getByTestId('blog-detail-title')).toBeVisible();
      await expect(page.getByTestId('blog-detail-content')).toBeVisible();
    });

    test('shows category badge and back link', async ({ page }) => {
      await page.goto('/blog/digital-transformation-2025');
      await expect(page.getByTestId('blog-detail-category')).toBeVisible();
      await expect(page.getByTestId('blog-detail-back-link')).toBeVisible();
    });

    test('displays article image', async ({ page }) => {
      await page.goto('/blog/digital-transformation-2025');
      await expect(page.getByTestId('blog-detail-image')).toBeVisible();
    });

    test('shows tags section', async ({ page }) => {
      await page.goto('/blog/digital-transformation-2025');
      await expect(page.getByTestId('blog-detail-tags')).toBeVisible();
    });

    test('displays share buttons', async ({ page }) => {
      await page.goto('/blog/digital-transformation-2025');
      await expect(page.getByText('Share this article')).toBeVisible();
    });

    test('back link navigates to blog list', async ({ page }) => {
      await page.goto('/blog/digital-transformation-2025');
      await page.getByTestId('blog-detail-back-link').click();
      await expect(page).toHaveURL(/\/blog$/);
    });
  });

  test.describe('FAQ Page', () => {
    test('renders FAQ page with heading and search', async ({ page }) => {
      await page.goto('/faq');
      await expect(page.getByTestId('faq-heading')).toBeVisible();
      await expect(page.getByTestId('faq-search')).toBeVisible();
    });

    test('shows category tabs', async ({ page }) => {
      await page.goto('/faq');
      await expect(page.getByTestId('faq-tab-general')).toBeVisible();
      await expect(page.getByTestId('faq-tab-pricing-&-billing')).toBeVisible();
      await expect(page.getByTestId('faq-tab-support')).toBeVisible();
      await expect(page.getByTestId('faq-tab-technical')).toBeVisible();
    });

    test('accordion items can be expanded', async ({ page }) => {
      await page.goto('/faq');
      // Click on first FAQ toggle
      const firstToggle = page.getByTestId('faq-toggle-1');
      await expect(firstToggle).toBeVisible();
      await firstToggle.click();
      // Expanded state should show answer content
      const faqItem = page.getByTestId('faq-item-1');
      await expect(faqItem).toBeVisible();
    });

    test('category tabs change displayed questions', async ({ page }) => {
      await page.goto('/faq');
      // Click Support tab
      await page.getByTestId('faq-tab-support').click();
      // Questions should change based on category
      await expect(page.getByTestId('faq-item-8')).toBeVisible();
    });

    test('search filters FAQ items', async ({ page }) => {
      await page.goto('/faq');
      await page.getByTestId('faq-search').fill('pricing');
      // Results count should appear
      await expect(page.getByText(/result/i)).toBeVisible();
    });

    test('displays contact CTA section', async ({ page }) => {
      await page.goto('/faq');
      await expect(page.getByText('Still have questions?')).toBeVisible();
      await expect(page.getByTestId('faq-contact-cta')).toBeVisible();
    });

    test('contact CTA navigates to contact page', async ({ page }) => {
      await page.goto('/faq');
      await page.getByTestId('faq-contact-cta').click();
      await expect(page).toHaveURL(/\/contact/);
    });
  });

  test.describe('Portfolio Page', () => {
    test('renders portfolio page with heading', async ({ page }) => {
      await page.goto('/portfolio');
      await expect(page.getByTestId('portfolio-heading')).toBeVisible();
    });

    test('shows category filter buttons', async ({ page }) => {
      await page.goto('/portfolio');
      await expect(page.getByTestId('portfolio-filter-all')).toBeVisible();
      await expect(page.getByTestId('portfolio-filter-web-development')).toBeVisible();
    });

    test('displays project cards in masonry-style grid', async ({ page }) => {
      await page.goto('/portfolio');
      await expect(page.getByTestId('portfolio-project-1')).toBeVisible();
    });

    test('category filter updates displayed projects', async ({ page }) => {
      await page.goto('/portfolio');
      // Filter by Web Development (project 2 is Web Development)
      await page.getByTestId('portfolio-filter-web-development').click();
      // Should show filtered projects - project 2 is web development
      await expect(page.getByTestId('portfolio-project-2')).toBeVisible();
    });

    test('clicking project opens modal', async ({ page }) => {
      await page.goto('/portfolio');
      await page.getByTestId('portfolio-project-1').click();
      await expect(page.getByTestId('portfolio-modal')).toBeVisible();
    });

    test('modal can be closed', async ({ page }) => {
      await page.goto('/portfolio');
      await page.getByTestId('portfolio-project-1').click();
      await expect(page.getByTestId('portfolio-modal')).toBeVisible();
      await page.getByTestId('portfolio-modal-close').click();
      await expect(page.getByTestId('portfolio-modal')).not.toBeVisible();
    });

    test('displays CTA section with quote button', async ({ page }) => {
      await page.goto('/portfolio');
      await expect(page.getByText('Ready to Start Your Project?')).toBeVisible();
      await expect(page.getByTestId('portfolio-cta-quote')).toBeVisible();
    });

    test('CTA quote button navigates to quote page', async ({ page }) => {
      await page.goto('/portfolio');
      await page.getByTestId('portfolio-cta-quote').click();
      await expect(page).toHaveURL(/\/quote/);
    });
  });
});
