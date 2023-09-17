
import { 
  CartFooter, 
  CartList, 
  CheckoutPersonalInfo, 
  InventoryList, 
  PrimaryHeader 
} from './components';
import { test } from './fixtures';
import { PRODUCTS_IDS } from './constants';

test.beforeEach(async ({ navigation }) => {
  await navigation.openCartDetals();
});

test('should validate that we can continue shopping', async ({ page }) => {
  await CartFooter(page).continueShopping();
  await InventoryList(page).expect().toBeVisible();
}); 

test('should validate that we can go from the cart to the checkout page', async ({ page }) => {
  await CartFooter(page).checkout();
  await CheckoutPersonalInfo(page).expect().toBeVisible();
}); 

test('should validate that a product can be removed from the cart', async ({ page, cart }) => {
  await cart.setInventoryIds([PRODUCTS_IDS.BACKPACK]);
  await page.reload(); 

  const primaryHeader = PrimaryHeader(page);
  const cartList = CartList(page);

  await primaryHeader.expect().toHaveCartBadge(1);
  await cartList.items().expect().toHaveCount(1);

  await cartList.itemAt(0).remove();

  await PrimaryHeader(page).expect().toHaveEmptyCart();
  await cartList.items().expect().toHaveCount(0);
});