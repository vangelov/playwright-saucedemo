import { expect, Page } from '@playwright/test';
import { Menu } from './menu';

export function SecondaryHeader(page: Page) {
  const self = page.locator('.header_secondary_container');
  const sortSelect = self.getByTestId('product_sort_container');
  const backButton = self.getByRole('button', { name: 'Back to products' });

  const sortBy = (option: string) => sortSelect.selectOption(option);
  const goBack = () => backButton.click();

  return {
    sortBy,
    goBack,
    expect: () => expect(self),
  };
}

//

export function PrimaryHeader(page: Page) {
  const self = page.locator('.primary_header');
  const cartBadge = self.locator('.shopping_cart_badge');
  const cartLink = self.locator('.shopping_cart_link');
  const menuButton = self.locator('#react-burger-menu-btn');

  const openCart = () => cartLink.click();

  const openMenu = async () => {
    await menuButton.click();
    return Menu(page);
  };

  return {
    openCart,
    openMenu, 
    expect: () => ({
      ...expect(self),
      toHaveEmptyCart: () => expect(cartBadge).not.toBeVisible(),
      toHaveCartBadge: (count: number) => expect(cartBadge).toHaveText(count.toString())
    })
  };
}

