
import { expect, Page, Locator } from '@playwright/test';

export function CartList(page: Page) {
  const self = page.locator('.cart_list');

  const items = (options?: CartItemOptions) => CartItem(self, options);
  const itemAt = (index: number) => items({ index });

  return {
    items,
    itemAt,
    expect: () => expect(self)
  };
}

//

type CartItemOptions = {
  index?: number;
};

export function CartItem(parent: Locator, { index }: CartItemOptions = {}) {
  let self = parent.locator('.cart_item');
  if (index !== undefined) self = self.nth(index);

  const removeButton = parent.getByRole('button', { name: 'Remove' });

  const remove = () => removeButton.click();
  const count = () => self.count();

  return {
    remove,
    count,
    expect: () => expect(self)
  }
}

// 

export function CartFooter(page: Page) {
  const self = page.locator('.cart_footer');
  const continueShoppingButton = self.getByRole('button', { name: 'Continue Shopping' });
  const checkoutButton = self.getByRole('button', { name: 'Checkout' });

  const continueShopping = () => continueShoppingButton.click();
  const checkout = () => checkoutButton.click();

  return {
    continueShopping,
    checkout,
    expect: () => expect(self)
  }
}