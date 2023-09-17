import { LoginForm } from "./components";
import { test } from './fixtures';
import { InventoryList } from "./components/inventory";
import { USERS } from './constants';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});
 
test('should be able to login with a standard user', async ({ page }) => {
  const { username, password } = USERS.STANDARD;
  await LoginForm(page).login(username, password);
  await InventoryList(page).expect().toBeVisible();
});
  
test('should not be able to login with a locked user', async ({ page }) => {
  const { username, password } = USERS.LOCKED_OUT;
  const loginForm = LoginForm(page);
  await loginForm.login(username, password);
  await loginForm.expect().toContainErrorText('Epic sadface: Sorry, this user has been locked out.');
});

test('should not be able to login with a wrong credentials', async ({ page }) => {
  const { username, password } = USERS.NON_EXISTING;
  const loginForm = LoginForm(page)
  await loginForm.login(username, password);
  await loginForm.expect().toContainErrorText('Epic sadface: Username and password do not match any user in this service');
});
 