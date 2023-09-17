import { LoginForm } from "./components";
import { test as setup } from '@playwright/test';
import { InventoryList } from "./components/inventory";
import { USERS } from './constants';

setup('auth', async ({ page }) => {
  await page.goto('/');

  const { username, password } = USERS.STANDARD;
  await LoginForm(page).login(username, password);
  await InventoryList(page).expect().toBeVisible();

  await page.context().storageState({ path: '.auth.json' });
});