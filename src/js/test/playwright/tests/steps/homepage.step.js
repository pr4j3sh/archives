const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("@cucumber/cucumber");

const { chromium, expect } = require("@playwright/test");

const { Page } = require("playwright");

setDefaultTimeout(60 * 1000);

let page, browser;

Before(async function () {
  browser = await chromium.launch({ headless: false });

  const context = await browser.newContext();

  page = await context.newPage();
});

Given("User navigates to the Browserstack Homepage", async () => {
  await page.goto("https://www.browserstack.com/");
});

When("User clicks on Product Menu", async function () {
  await page.locator('button[aria-label="Products"]').waitFor();

  await page.locator('button[aria-label="Products"]').click();
});

Then("It should show Web Testing Product", async function () {
  await page
    .locator('div[aria-label="Products"] button[title="Web Testing"]')
    .waitFor();

  expect(
    await page
      .locator('div[aria-label="Products"] button[title="Web Testing"] span')
      .isVisible(),
  ).toBeTruthy();
});

Given("User Navigates to Browserstack Homepage", async function () {
  await page.goto("https://www.browserstack.com/");
});

When("User clicks on Pricing Menu", async function () {
  await page.locator('a[title="Pricing"]').click();
});

Then("It should Display correct Product lists in left Nav", async function () {
  var leftNavProducts = await page
    .locator('div[id="sidenav__list"]')
    .textContent();

  var productArray = await leftNavProducts.split("\n").map((item) => {
    return item.trim();
  });

  expect(productArray).toEqual(expect.arrayContaining(["Live", "App Live"]));
});

Given("Browser is opened", async () => {});

When("User navigates to pr4j3sh Website Homepage", async function () {
  await page.goto("https://pr4j3sh.github.io/pr4j3sh/");
});

Then("It should have 4j3 in title", async function () {
  await expect(page).toHaveTitle(/4j3/);
});

After(async function () {
  await browser.close();
});
