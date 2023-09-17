
import { test } from './fixtures';
import { 
  InventoryList, 
  SecondaryHeader, 
  InventoryDetails,
  PrimaryHeader
} from './components';
import { PRODUCTS_IDS } from './constants';

test.beforeEach(async ({ page, navigation }) => {
  await navigation.openInventoryDetails('4');
  await InventoryDetails(page).expect().toBeVisible();
});   

test('should validate that all products are present', async ({ page }) => {
  await SecondaryHeader(page).goBack();
  await InventoryList(page).expect().toBeVisible();
}); 

test('should validate that a product can be added to a cart', async ({ page }) => {
  await PrimaryHeader(page).expect().toHaveEmptyCart();

  const inventoryDetails = InventoryDetails(page);
  await inventoryDetails.addToCart();
  await inventoryDetails.expect().toBeInCart();

  await PrimaryHeader(page).expect().toHaveCartBadge(1);
});

test('should validate that a product can be removed from the cart', async ({ page, cart }) => {
  await cart.setInventoryIds([PRODUCTS_IDS.BACKPACK]);
  await page.reload(); 

  await PrimaryHeader(page).expect().toHaveCartBadge(1);

  const inventoryDetails = InventoryDetails(page);
  await inventoryDetails.removeFromCart();
  await inventoryDetails.expect().toBeInCart(false);

  await PrimaryHeader(page).expect().toHaveEmptyCart();
});

