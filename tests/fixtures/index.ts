import { test as base } from '@playwright/test';
import { createLocalStorage, LocalStorage } from './local-storage';
import { createCart, Cart } from './cart';
import { createNavigation, Navigation } from './navigation';

type Fixtures = {
    localStorage: LocalStorage;
    cart: Cart;
    navigation: Navigation;
};

export const test = base.extend<Fixtures>({

    localStorage: async ({ page }, use) => {
      const localStorage = createLocalStorage(page);
      await use(localStorage);
    },

    cart: async ({ localStorage }, use) => {
      const cart = createCart(localStorage);
      await use(cart);
    },

    navigation: async ({ page }, use) => {
      const navigation = createNavigation(page);
      await use(navigation);
    }
});