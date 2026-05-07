import { test, expect } from '@playwright/test';
import { waitForAppReady, loginAsAdmin } from '../fixtures/helpers';

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage first
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
    await loginAsAdmin(page);
  });

  test('should display dashboard overview with stats', async ({ page }) => {
    // Dashboard should be visible
    await expect(page.getByTestId('admin-dashboard')).toBeVisible();
    
    // Should show Overview tab by default
    await expect(page.getByTestId('admin-tab-dashboard')).toBeVisible();
    
    // Dashboard should have stats cards - use first() to handle duplicates
    await expect(page.getByText('Total Leads').first()).toBeVisible();
    await expect(page.getByText('New Leads').first()).toBeVisible();
    await expect(page.getByText('Quote Requests').first()).toBeVisible();
    // "Converted" appears multiple times, use a more specific selector
    await expect(page.locator('p:has-text("Converted")').first()).toBeVisible();
  });

  test('should navigate between tabs', async ({ page }) => {
    // Click Leads tab
    await page.getByTestId('admin-tab-leads').click();
    await expect(page.getByTestId('leads-search-input')).toBeVisible();
    await expect(page.getByTestId('leads-status-filter')).toBeVisible();
    
    // Click Quotes tab
    await page.getByTestId('admin-tab-quotes').click();
    await expect(page.getByTestId('quotes-search-input')).toBeVisible();
    
    // Click Newsletter tab
    await page.getByTestId('admin-tab-newsletter').click();
    await expect(page.getByText('Subscribers').first()).toBeVisible();
    
    // Click back to Dashboard
    await page.getByTestId('admin-tab-dashboard').click();
    await expect(page.getByText('Lead Pipeline')).toBeVisible();
  });

  test('should show leads list in Leads tab', async ({ page }) => {
    await page.getByTestId('admin-tab-leads').click();
    
    // Table headers should be visible - use role selectors
    await expect(page.getByRole('columnheader', { name: 'Contact' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Message' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Date' })).toBeVisible();
  });

  test('should filter leads by status', async ({ page }) => {
    await page.getByTestId('admin-tab-leads').click();
    
    // Select status filter
    const statusFilter = page.getByTestId('leads-status-filter');
    await expect(statusFilter).toBeVisible();
    
    // Change filter to "New"
    await statusFilter.selectOption('new');
    
    // Wait for filter to apply
    await page.waitForTimeout(500);
    
    // Change back to "All"
    await statusFilter.selectOption('all');
  });

  test('should search leads', async ({ page }) => {
    await page.getByTestId('admin-tab-leads').click();
    
    const searchInput = page.getByTestId('leads-search-input');
    await expect(searchInput).toBeVisible();
    
    // Type search query
    await searchInput.fill('test');
    
    // Wait for search to apply
    await page.waitForTimeout(500);
    
    // Clear search
    await searchInput.clear();
  });
});
