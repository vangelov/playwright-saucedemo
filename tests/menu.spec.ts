import { test } from './fixtures';
import { 
  InventoryList, 
  InventoryDetails,
  PrimaryHeader,
  LoginForm 
} from './components';
import { PRODUCTS_IDS } from './constants';

test.beforeEach(async ({ page, navigation }) => {
  await navigation.openInventoryDetails('4');
  await InventoryDetails(page).expect().toBeVisible();
});   

test('should be able to open the swag items overview page', async ({ page }) => {
  const menu = await PrimaryHeader(page).openMenu();
  await menu.openAllItems();
  await InventoryList(page).expect().toBeVisible();
});  

test('should be able to logout"', async ({ page }) => {
  const menu = await PrimaryHeader(page).openMenu();
  await menu.logout();
  await LoginForm(page).expect().toBeVisible();
});  

test('should be able to clear the cart', async ({ page, cart }) => {
  await cart.setInventoryIds([PRODUCTS_IDS.BACKPACK]);
  await page.reload();

  const primaryHeader = PrimaryHeader(page);
  primaryHeader.expect().toHaveCartBadge(1);

  const menu = await primaryHeader.openMenu();
  await menu.resetAppState();

  await primaryHeader.expect().toHaveEmptyCart();
});