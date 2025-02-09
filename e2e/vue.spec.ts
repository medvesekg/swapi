import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('home page has links to categories', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator("a[href='/characters']")).toBeVisible()
  await expect(page.locator("a[href='/starships']")).toBeVisible()
  await expect(page.locator("a[href='/characters']")).toBeVisible()
})

test('can navigate from home page to category page', async ({ page }) => {
  await page.goto('/')
  await page.locator("a[href='/characters']").click()
  expect(page.url()).toContain('characters')
})

test('category page shows list of items', async ({ page }) => {
  await page.goto('/characters')
  await page.waitForResponse((res) => res.url().includes('people'))
  await expect(page.locator('tr')).toHaveCount(11)
})

test('category page pagination', async ({ page }) => {
  await page.goto('/characters')
  await page.waitForResponse((res) => res.url().includes('people'))
  await expect(page.getByTestId('current-page')).toContainText('1')
  await page.getByTestId('next').click()
  await page.waitForResponse((res) => res.url().includes('people'))
  await expect(page.getByTestId('current-page')).toContainText('2')
  await page.getByTestId('prev').click()
  await expect(page.getByTestId('current-page')).toContainText('1')
})

test('navigate from category to details page', async ({ page }) => {
  await page.goto('/characters')
  await page.waitForResponse((res) => res.url().includes('people'))
  await page.locator('td a').first().click()
  const regex = /characters\/\d/
  expect(regex.test(page.url())).toBe(true)
})

test('details page', async ({ page }) => {
  await page.goto('/characters/1')
  await page.waitForResponse((res) => res.url().includes('people'))
  await expect(page.locator('h1')).not.toBeEmpty()
  expect(await page.locator('tr').count()).toBeGreaterThan(1)
})
