import { CheckoutOverview, CheckoutComplete, InventoryList, CartList } from './components';
import { test } from './fixtures';
import { PRODUCTS_IDS } from './constants';

test.beforeEach(async ({ page, navigation, cart }) => {
  await navigation.openCheckoutOverview();
  await cart.setInventoryIds([PRODUCTS_IDS.BACKPACK]);
  await page.reload();
});

test('should validate that we can continue shopping', async ({ page }) => {
  await CheckoutOverview(page).finishCheckout();
  await CheckoutComplete(page).expect().toBeVisible();
});

test('should validate that we can cancel checkout and go to the inventory page', async ({ page }) => {
  await CheckoutOverview(page).cancelCheckout();
  await InventoryList(page).expect().toBeVisible();
});

test('should validate that we have 1 product in our checkout overview', async ({ page }) => {
  await CartList(page).items().expect().toHaveCount(1);
});
 


  
 