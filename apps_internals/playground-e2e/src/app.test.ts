import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  expect(await page.title()).toContain('Home | ')
  // expect(await page.locator('h1').innerText()).toContain('Hello')
})
