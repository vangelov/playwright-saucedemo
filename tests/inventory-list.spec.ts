import { test } from './fixtures';
import { 
  InventoryList, 
  InventoryDetails,
  SecondaryHeader, 
  PrimaryHeader, 
  CartList
} from './components';
import { PRODUCTS_IDS } from './constants';
 
test.beforeEach(async ({ navigation }) => {
  await navigation.openInventoryList();
});
  
test('should validate that all products are present', async ({ page }) => {
  const invetoryList = InventoryList(page);
  await invetoryList.items().expect().toHaveCount(6);
});

test('should be able to sort the items', async ({ page }) => {
  await SecondaryHeader(page).sortBy('Price (high to low)');
  const invetoryList = InventoryList(page);
  await invetoryList.itemAt(0).expect().toContainText('Sauce Labs Fleece Jacket');
});

test('should validate that the details of a product can be opened', async ({ page }) => {
  const name = 'Sauce Labs Fleece Jacket';
  const item = InventoryList(page).items({ name });
  await item.openDetails();
  await InventoryDetails(page).expect().toBeVisible();
}); 

test('should validate that a product can be added to the cart', async ({ page }) => {
  const primaryHeader = PrimaryHeader(page);
  await primaryHeader.expect().toHaveEmptyCart();
   
  const firstItem = InventoryList(page).itemAt(0);
  await firstItem.addToCart();
  await firstItem.expect().toBeInCart();

  await primaryHeader.expect().toHaveCartBadge(1);
});

test('should validate that a product can be removed from the cart', async ({ page, cart }) => {
  await cart.setInventoryIds([PRODUCTS_IDS.BACKPACK]);
  await page.reload();

  const primaryHeader = PrimaryHeader(page);
  await primaryHeader.expect().toHaveCartBadge(1);

  const firstItem = InventoryList(page).itemAt(0);
  await firstItem.removeFromCart();
  await firstItem.expect().toBeInCart(false);

  await primaryHeader.expect().toHaveEmptyCart();
}); 
 
test('should be able to open the cart summary page', async ({ page }) => {
  await PrimaryHeader(page).openCart();
  await CartList(page).expect().toBeVisible();
});


  
